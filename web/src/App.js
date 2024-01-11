import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import pickupLinesLogo from "./images/k.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentPickupLine, setCurrentPickupLine] = useState("");
  const [loading, setLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharedBy, setSharedBy] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [note, setNote] = useState("");
  const [shared, setShared] = useState(false);
  const [sharedPickupLine, setSharedPickupLine] = useState("");

  useEffect(() => {
    getPickUpLine();
  }, []);

  const getPickUpLine = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://lucky-spacesuit-bear.cyclic.app/api/pickup"
      );
      setCurrentPickupLine(response.data.pickup);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error while fetching pickup line");
    }
  };

  const getSharedPickupLine = async (id) => {
    try {
      const response = await axios.get(
        `https://lucky-spacesuit-bear.cyclic.app/api/shared/${id}`
      );
      const sharedLine = response.data.pickup;
      setSharedPickupLine(sharedLine);
      setShared(true);
    } catch (error) {
      toast.error("Error while fetching shared pickup line");
    }
  };

  const handleGitHubLinkClick = () => {
    window.open("https://github.com/pacifiquem", "_blank");
  };

  const handleShareModalOpen = () => {
    setShowShareModal(true);
  };

  const handleShareModalClose = () => {
    setShowShareModal(false);
  };

  const handleShare = async () => {
    if (!sharedBy || !sentTo || !note) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://lucky-spacesuit-bear.cyclic.app/api/shared",
        {
          sharedBy,
          sentTo,
          note,
          pickup: currentPickupLine,
        }
      );

      if (response.status !== 200) {
        toast.error("Error while sharing pickup line");
        return;
      }

      navigator.clipboard.writeText(
        `https://pln-orcin.vercel.app?shared=${response.data._id}`
      );

      toast.success(
        `Pickup line shared successfully. Link copied to clipboard`
      );
      setSharedBy("");
      setSentTo("");
      setNote("");
      setShowShareModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Error while sharing pickup line");
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedId = urlParams.get("shared");

    if (sharedId) {
      getSharedPickupLine(sharedId);
    }
  }, []);

  return (
    <div className="App">
      {!shared && (
        <section className="app-section">
          <img
            src={pickupLinesLogo}
            alt="Pickup Lines"
            className="logo-image groups"
          />
          <div className="pickup-line-box groups">
            <p className="pickup-line-text">{currentPickupLine}</p>
          </div>
          <div className="share-next-button">
            <button
              className="next-button"
              onClick={getPickUpLine}
              disabled={loading}
            >
              {loading ? "Loading..." : "Next"}
            </button>
            <button className="share-button" onClick={handleShareModalOpen}>
              Share
            </button>
          </div>
        </section>
      )}

      {shared && (
        <section className="app-section">
          <img
            src={pickupLinesLogo}
            alt="Pickup Lines"
            className="logo-image groups"
          />
          <div className="pickup-line-box groups">
            <p className="pickup-line-text">{sharedPickupLine}</p>
            <p className="note-text">{note}</p>
          </div>
          <div>
            <button
              className="next-button"
              onClick={() => {
                setShared(false);
                setSharedPickupLine("");
                window.location.href = "https://pln-orcin.vercel.app";
              }}
            >
              Go Home
            </button>
          </div>
        </section>
      )}

      <div>
        <ToastContainer />
      </div>
      <div className={`share-modal${showShareModal ? " active" : ""}`}>
        <div className="modal-content">
          <span className="close-button" onClick={handleShareModalClose}>
            &times;
          </span>
          <label>
            Shared by:
            <input
              type="text"
              value={sharedBy}
              onChange={(e) => setSharedBy(e.target.value)}
            />
            <br />
          </label>
          <label>
            Sent to:
            <input
              type="text"
              value={sentTo}
              onChange={(e) => setSentTo(e.target.value)}
            />
            <br />
          </label>
          <label>
            Note:
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tell Him/Her something"
            />
            <br />
          </label>
          <button className="share-button" onClick={handleShare}>
            Get Link
          </button>
        </div>
      </div>
      <footer className="app-footer">
        <p>
          Written by{" "}
          <span onClick={handleGitHubLinkClick} className="github-link">
            {" "}
            MURANGWA Pacifique
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;
