import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import StateSubscriber from "./StateSubscriber";
import DebugPage from "../pages/DebugPage";
import KeplrErrorModal from "../components/KeplrErrorModal";

function App() {
  return (
    <div className="App">
      <StateSubscriber></StateSubscriber>
      <BrowserRouter>
        <Routes>
          <Route path="/debug" element={<DebugPage />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      <KeplrErrorModal></KeplrErrorModal>
    </div>
  );
}

export default App;
