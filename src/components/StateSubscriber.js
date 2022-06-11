import {
  currentAccountSelector,
  allMintedTokensState,
  allMintedTokensLoadingState,
  myMintedTokensState,
  myMintedFuelsState,
  myMintedRocketsState,
  myMintedTokensLoadingState,
  keplrDerviedState,
  mintedCountState,
  keplrClientState,
} from "../state";
import {
  useRecoilValueLoadable,
  useRecoilCallback,
  useRecoilValue,
} from "recoil";
import { useEffect } from "react";
import AsyncNftHelper from "../utils/AsyncNftHelper";
import NftHelper from "../utils/NftHelper";
import config from "../config";

function StateSubscriber() {
  // I had trouble doing this without a separate compontent
  // Need to watch the accountId from Keplr
  const currentAccount = useRecoilValueLoadable(currentAccountSelector);
  const areMyTokensLoading = useRecoilValue(myMintedTokensLoadingState);
  const areAllTokensLoading = useRecoilValue(allMintedTokensLoadingState);
  const client = useRecoilValueLoadable(keplrClientState).valueMaybe();

  const setAllTokens = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(allMintedTokensState, (current) => {
        const minted = current || [];
        return [...new Set([...minted, ...tokenIds])];
      });
    }
  });
  const setMyTokens = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(myMintedTokensState, (current) => [
        ...new Set([...current, ...tokenIds]),
      ]);
    }
  });

  const setMyRockets = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(myMintedRocketsState, (current) => [
        ...new Set([...current, ...tokenIds]),
      ]);
    }
  });

  const setMyFuels = useRecoilCallback(({ set }) => (tokenIds) => {
    if (tokenIds.length) {
      set(myMintedFuelsState, (current) => [
        ...new Set([...current, ...tokenIds]),
      ]);
    }
  });
  const setNumMinted = useRecoilCallback(({ set }) => (numMinted) => {
    set(mintedCountState, numMinted);
  });

  const resetKeplr = useRecoilCallback(({ reset }) => (tokenIds) => {
    reset(keplrDerviedState);
  });

  const setAllTokensLoading = useRecoilCallback(({ set }) => (isLoading) => {
    set(allMintedTokensLoadingState, isLoading);
  });
  const setMyTokensLoading = useRecoilCallback(({ set }) => (isLoading) => {
    set(myMintedTokensLoadingState, isLoading);
  });
  // Once it is available, we'll pagniate through some of the APIs, updating loaded state as it comes
  useEffect(() => {
    const helper = client.readOnlyClient ? new NftHelper(client, config) : {};

    const loadAllMyTokens = async () => {
      setMyTokensLoading(true);
      const accountId = currentAccount.valueOrThrow();

      let myTokensStartAfter = null;
      let myTokens = [];
      do {
        myTokens = await helper.getMyMintedTokens(
          accountId,
          myTokensStartAfter
        );

        myTokensStartAfter = myTokens[myTokens.length - 1];
        setMyTokens(myTokens);
      } while (myTokens.length >= helper.limit);
      // setMyTokensLoading(false);
    };

    if (
      !areMyTokensLoading &&
      currentAccount.valueMaybe() &&
      helper.signingClient
    ) {
      loadAllMyTokens();
      window.addEventListener("keplr_keystorechange", resetKeplr);
    }

    const loadAllTokens = async (startAfter) => {
      const allTokens = await helper.getAllMintedTokens(startAfter);
      setAllTokens(allTokens);
      if (allTokens.length >= helper.limit) {
        loadAllTokens(allTokens[allTokens.length - 1]);
      } else {
        return;
      }
    }; 

// Rockets start

    const loadAllMyRockets = async () => {
      setMyTokensLoading(true);
      const accountId = currentAccount.valueOrThrow();

      let myTokensStartAfter = null;
      let myTokens = [];
      do {
        myTokens = await helper.getMyMintedRockets(
          accountId,
          myTokensStartAfter
        );

        myTokensStartAfter = myTokens[myTokens.length - 1];
        setMyRockets(myTokens);
      } while (myTokens.length >= helper.limit);
      // setMyTokensLoading(false);
    };

    if (
      !areMyTokensLoading &&
      currentAccount.valueMaybe() &&
      helper.signingClient
    ) {
      loadAllMyRockets();
      window.addEventListener("keplr_keystorechange", resetKeplr);
    }

    // end rockets

    // Fuels start

    const loadAllMyFuels = async () => {
      setMyTokensLoading(true);
      const accountId = currentAccount.valueOrThrow();

      let myTokensStartAfter = null;
      let myTokens = [];
      do {
        myTokens = await helper.getMyMintedFuels(
          accountId,
          myTokensStartAfter
        );

        myTokensStartAfter = myTokens[myTokens.length - 1];
        setMyFuels(myTokens);
      } while (myTokens.length >= helper.limit);
      // setMyTokensLoading(false);
    };

    if (
      !areMyTokensLoading &&
      currentAccount.valueMaybe() &&
      helper.signingClient
    ) {
      loadAllMyFuels();
      window.addEventListener("keplr_keystorechange", resetKeplr);
    }

    // end fuels

    const setMintedCount = async () => {
      helper.getProgress().then((progress) => {
        setNumMinted(progress.minted);
      });
    };

    const doAllTokenLoading = async () => {
      setAllTokensLoading(true);
      loadAllTokens();
      setMintedCount();
    };

    if (!areAllTokensLoading && helper.readOnlyClient) {
      doAllTokenLoading();
    }
  });

  return <></>;
}

export default StateSubscriber;
