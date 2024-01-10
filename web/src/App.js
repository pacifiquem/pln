import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import pickupLinesLogo from "./images/k.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currentPickupLine, setCurrentPickupLine] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPickUpLine();
  }, []);

    const getPickUpLine = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://lucky-spacesuit-bear.cyclic.app/api/pickup");
        setCurrentPickupLine(response.data.pickup);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error while fetching pickup line");
      }
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={pickupLinesLogo} alt="Pickup Lines" className="logo-image" />
        <div className="pickup-line-box">
          <p className="pickup-line-text">{currentPickupLine}</p>
        </div>
        <button className="next-button" onClick={getPickUpLine} disabled={loading}>
          {loading ? "Loading..." : "Next"}
        </button>
      </header>
      <div>
      <ToastContainer />
      </div>
    </div>
  );
}

export default App;
