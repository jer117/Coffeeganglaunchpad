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
  let imgLoc = null;

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
  } else if (mintError.includes("ROCKETBURNERROR")) {
    errorMsg = "There has been a launch error - your Fuel was burned successfully but your Rocket was not. Please contact Stargazers with your token numbers and we will manually complete your launch.";
  } else if (mintError.includes("MINTSUCCESS")) {
    const myArray = mintError.split(' ');
    tokenUrl = myArray[1];
    imgLoc = myArray[2];
    console.log("tokenUrl ", tokenUrl);
    console.log("imgLoc: ", imgLoc);
    errorMsg = "Your Rocket and Fuel have been burned, behold your new Stargazers Cosmonaut PFP! Click on it to view full details";
    errorTop = "Successful Launch!"
  } else if (mintError.includes("ROCKETAPPROVED")) {
    errorMsg = "Rocket Approved for Launch!";
    errorTop = "Selection Success!"
  } else if (mintError.includes("FUELAPPROVED")) {
    errorMsg = "Fuel Approved for Launch!";
    errorTop = "Selection Success!"
  } else if (mintError.includes("code 11") || mintError.includes("Code: 11")) {
    errorMsg =
      "There was not enough gas used to perform the mint. Please try increasing the gas and try again.";
  } else if (mintError.includes("(18)")) {
    errorMsg =
      "Too much traffic - please try again in a moment";
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
        <a href={tokenUrl} target="_blank"><img src={imgLoc}></img></a>
        
      </article>
    </dialog>
  );
}

export default KeplrMintError;
