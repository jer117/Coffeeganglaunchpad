import log from "loglevel";
import React from "react";
import {
  useRecoilState,
} from "recoil";
import "./MintButton.css";
import {
  fuelIdState,
} from "../state";


function FuelInput() {
  const [fuelId, setFuelId] = useRecoilState(fuelIdState);


  const updateFuelId = (event) => {
    setFuelId(event.target.value);
  }

  return (
    <div>
      <label>
      Fuel Token Id:
      <input type="number" onChange={updateFuelId} class="input"/>
      </label>
    </div>
  );
}

export default FuelInput;
