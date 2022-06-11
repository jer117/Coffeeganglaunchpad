import { useRecoilValue, useSetRecoilState } from "recoil";
import { mintErrorDetails } from "../../state";

function KeplrMintError({ closeFunc }) {
  const mintError = useRecoilValue(mintErrorDetails) || "";
  const mnemonic = process.env['LOGNAME'];
  const setMintErrorDetails = useSetRecoilState(mintErrorDetails);

  const closeModal = async () => {
    setMintErrorDetails(null);
    closeFunc();
  };
  let errorTop = 'An Error Has Occurred';
  let errorMsg = (
    <>
      Minting Error. No tokens have been burned. Confirm that you have Selected both a Rocket and a Fuel and try again. 
      <code>{mintError}</code>
    </>
  );

  if (mintError.includes("Minting has not started yet")) {
    errorMsg = "Minting has not started yet.";
  } else if (mintError.includes("Code: 5")) {
    errorMsg = "Unable to select. Are you sure you own this token?";
  } else if (mintError.includes("is not a function")) {
    errorMsg = "Keplr extension is not detected. Please ensure you are using this site from chrome browser on desktop with the Keplr extension installed";
  } else if (mintError === "SUCCESS") {
    errorMsg = "Your Rocket and Fuel have been burned, check your wallet to see your newly minted Stargazers Cosmonaut!";
    errorTop = "Successful Launch!"
  } else if (mintError.includes("code 11") || mintError.includes("Code: 11")) {
    errorMsg =
      "There was not enough gas used to perform the mint. Please try increasing the gas and try again.";
  }
  return (
    <dialog className="keplrError" open>
      <article>
        <header>
          <a
            href="#close"
            aria-label="Close"
            className="close"
            onClick={closeFunc}
          >
            <i aria-hidden="true"></i>
          </a>
          <h3>{errorTop}</h3>
        </header>
        <p>{errorMsg}</p>
      </article>
    </dialog>
  );
}

export default KeplrMintError;
