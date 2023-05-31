import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [currentPickupLine, setCurrentPickupLine] = useState(
    " I never believed in love at first sight, but that was before I saw you."
  );

  useEffect(() => {
    (async function getPickUpLine() {
      let response = await axios.get("https://vinuxd.vercel.app/api/pickup");
      setCurrentPickupLine(response.json()["pickup"]);
    })();
  }, []);

  return <div className="App">{currentPickupLine}</div>;
}

export default App;
