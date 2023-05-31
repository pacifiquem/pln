import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import pickupLinesLogo from "./images/k.png";

function App() {
  const [currentPickupLine, setCurrentPickupLine] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPickUpLine();
  }, []);

  const getPickUpLine = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://vinuxd.vercel.app/api/pickup");
      setCurrentPickupLine(response.json()["pickup"]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pickup line:", error);
      setLoading(false);
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
    </div>
  );
}

export default App;
