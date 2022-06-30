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
  let tokenUrl = null;

  if (mintError.includes("Minting has not started yet")) {
    errorMsg = "Minting has not started yet.";
  } else if (mintError.includes("Code: 5")) {
    errorMsg = "Unable to select. Are you sure you own this token and haven't already burned it?";
  } else if (mintError.includes("is not a function")) {
    errorMsg = "Keplr extension is not detected. Please ensure you are using this site from chrome browser on desktop with the Keplr extension installed";
  } else if (mintError.includes("FUELQUERYERROR")) {
    errorMsg = "Unable to verify Fuel info - are you sure it has been minted and hasn't already been burned";
  } else if (mintError.includes("ROCKETQUERYERROR")) {
    errorMsg = "Unable to verify Rocket info - are you sure it has been minted and hasn't already been burned";
  } else if (mintError.includes("FUELNOAPPROVAL")) {
    errorMsg = "You have not granted approval to burn this fuel";
  } else if (mintError.includes("ROCKETNOAPPROVAL")) {
    errorMsg = "You have not granted approval to burn this rocket";
  } else if (mintError.includes("FUELNOTOWNER")) {
    errorMsg = "You do not own this fuel";
  } else if (mintError.includes("ROCKETNOTOWNER")) {
    errorMsg = "You do not own this rocket";
  } else if (mintError.includes("MINTSUCCESS")) {
    const [ermsg, tokenUrl, imgLoc] = mintError.split('~');
    console.log("tokenUrl ", tokenUrl);
    console.log("imgLoc: ", imgLoc);
    errorMsg = "Your Rocket and Fuel have been burned, click below to see your new Stargazers Cosmonaut!";
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
        <h4>{errorMsg}</h4>
        <a href={tokenUrl} target="_blank">{tokenUrl}</a>
        <img src={imgLoc} />
      </article>
    </dialog>
  );
}

export default KeplrMintError;
