import log from "loglevel";
import React from "react";
import {
  useRecoilValueLoadable,
  useResetRecoilState,
  useSetRecoilState,
  useRecoilState,
} from "recoil";
import "./MintButton.css";
import {
  keplrDerviedState,
  newTokenAddedSelector,
  mintedCountState,
  mintErrorDetails,
  fuelIdState,
} from "../state";
import AsyncNftHelper from "../utils/AsyncNftHelper";

const mintStates = {
  loaded: {
    label: "Select Fuel",
    disabled: false,
    loading: false,
  },
  loading: {
    label: "Loading...",
    disabled: true,
    loading: true,
  },
  minting: {
    label: "Processing...",
    disabled: true,
    loading: true,
  },
  error: {
    label: "Error",
    disabled: true,
    loading: false,
  },
  mint_error: {
    label: "Selection Error",
    disabled: true,
    loading: false,
  },
};

function FuelSelectButton() {
  const resetMintedCount = useResetRecoilState(mintedCountState);
  const kState = useRecoilValueLoadable(keplrDerviedState);
  const setKeplrState = useSetRecoilState(keplrDerviedState);
  const setNewToken = useSetRecoilState(newTokenAddedSelector);
  const setMintErrorDetails = useSetRecoilState(mintErrorDetails);
  const [fuelId, setFuelId] = useRecoilState(fuelIdState);

  const buttonState =
    kState.map((s) => mintStates[s]).valueMaybe() || mintStates.loading;

  const Mint = async () => {
    setKeplrState("minting");
    const nftHelper = await AsyncNftHelper.getInstance();
    try {
      nftHelper
        .approveFuel(fuelId)
        .then((result4) => {
//          setNewToken(tokenId);
//          resetMintedCount();
          log.error(result4);
          console.log('result4 =', result4);
          setKeplrState("mint_error");
          setMintErrorDetails(result4);
        })
        .catch((e) => {
          if (e.message === "Request rejected") {
            log.debug("Request rejected, reloading");
            setKeplrState("loaded");
          } else {
            log.error(e);
            setKeplrState("mint_error");
            setMintErrorDetails(e.message);
          }
        });
    } catch (e) {
      setKeplrState("mint_error");
      setMintErrorDetails(e.message);
    }
  };

  return (
      <button
        className="fuelButton"
        aria-busy={buttonState.loading}
        disabled={buttonState.disabled}
        onClick={Mint}
      >
        {buttonState.label}
      </button>
  );
}

export default FuelSelectButton;
