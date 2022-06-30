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
  rocketIdState,
} from "../state";
import AsyncNftHelper from "../utils/AsyncNftHelper";

const mintStates = {
  loaded: {
    label: "Select Rocket",
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

function RocketSelectButton() {
  const resetMintedCount = useResetRecoilState(mintedCountState);
  const kState = useRecoilValueLoadable(keplrDerviedState);
  const setKeplrState = useSetRecoilState(keplrDerviedState);
  const setNewToken = useSetRecoilState(newTokenAddedSelector);
  const setMintErrorDetails = useSetRecoilState(mintErrorDetails);
  const [rocketId, setRocketId] = useRecoilState(rocketIdState);

  const buttonState =
    kState.map((s) => mintStates[s]).valueMaybe() || mintStates.loading;

  const Mint = async () => {
    setKeplrState("minting");
    const nftHelper = await AsyncNftHelper.getInstance();
    try {
      nftHelper
        .approveRocket(rocketId)
        .then((result4) => {
//          setNewToken(tokenId);
//          resetMintedCount();
          log.error(result4);
          console.log('result4 =', result4);
          setKeplrState("mint_error");
          setMintErrorDetails("temp");
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
      className="rocketButton"
      aria-busy={buttonState.loading}
      disabled={buttonState.disabled}
      onClick={Mint}
    >
      {buttonState.label}
    </button>
  );
}

export default RocketSelectButton;
