import { 
  useRecoilValueLoadable 
} from "recoil";
import {
  currentAccountSelector,
} from "../state";
import "./Gallery.scss";
import "../components/MintButton.css";
import FuelSelectButton from "../components/FuelSelectButton";
import RocketSelectButton from "../components/RocketSelectButton";
import TransmuteButton from "../components/TransmuteButton";
import RocketInput from "../components/RocketSelectForm";
import FuelInput from "../components/FuelSelectForm";

function Gallery() {
  let currentAccount = "Processing"
  let currentAccountCheck = useRecoilValueLoadable(
    currentAccountSelector
  ).valueMaybe();
  
  if (currentAccountCheck){
    currentAccount = currentAccountCheck;
  }
  const accountURL = "https://testnet.publicawesome.dev/profile/" + useRecoilValueLoadable(
    currentAccountSelector
  ).valueMaybe() + "/all";





  return (
    <div style={{ backgroundImage: "url(/images/nuclearFootball.png)", backgroundRepeat: 'no-repeat', height:'1000px'}}>
      {/*<div className="gallery-head">
        <hgroup>
          <h2>Choose Your Rocket</h2>
        </hgroup>
      </div>
      <div className="grid">
        <MiniRocketList tokenIds={pagedRocketIds}></MiniRocketList>
      </div>
      <Pagination pagination={paginationR}></Pagination> */}
      <div style={{ position: "absolute", left:"982px", top: "10px"}}> 
        <p className="walletWidgetz" >
          <a className="link" href={accountURL} target="_blank">{currentAccount}</a>
        </p>
      </div>
      <div style={{ position: "absolute", left: "497px",top: "215px", width: "245px"}}>
        <RocketInput></RocketInput>
      </div>
      <div style={{ position: "absolute", left: "742px", top: "198px"}}>
        <RocketSelectButton></RocketSelectButton>
      </div>
      {/*<div className="gallery-head">
        <hgroup>
          <h2>Choose Fuels</h2>
        </hgroup>
      </div>
      <div className="grid">
        <MiniFuelList tokenIds={pagedFuelIds}></MiniFuelList>
      </div>
    <Pagination pagination={paginationF}></Pagination> */}
      <div style={{ position: "absolute", left: "497px", top: "335px",width: "245px"}}>
        <FuelInput></FuelInput>
      </div>
      <div style={{ position: "absolute", left: "742px", top: "319px"}}>
        <FuelSelectButton></FuelSelectButton>
      </div> 
      <div style={{ position: "absolute", left: "477px", top: "442px"}}>
        <TransmuteButton></TransmuteButton>
      </div> 
    </div>
  );
}

export default Gallery;
