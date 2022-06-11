import log from "loglevel";
import React from "react";
import {
  useRecoilState,
} from "recoil";
import "./MintButton.css";
import {
  rocketIdState,
} from "../state";


function RocketInput() {

  const [rocketId, setRocketId] = useRecoilState(rocketIdState);

  const updateRocketId = (event) => {
    setRocketId(event.target.value);
  }

  return (
    <div>
      <label>
        Rocket Token Id:
        <input type="number" onChange={updateRocketId} class="input"/>
      </label>
    </div>
  );
}

export default RocketInput;
