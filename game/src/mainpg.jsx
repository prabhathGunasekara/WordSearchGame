import React from "react";
import { useNavigate } from "react-router-dom";
import "./mainpg.css";

function MainPG() {
  const navigate = useNavigate();

  const handlePlayClick = () => {
     
    navigate("/gamepg");
  };

  const handleLeaderboardClick = () => {
     
    navigate("/leaderboard");
  };

  return (
    <div className="main-container">
      <div className="mainpgcontainer">
        <h1>Word Puzzle</h1>
        <button className="play-button" onClick={handlePlayClick}>
          Play
        </button>
        <br></br>
        <button className="leaderboard-button" onClick={handleLeaderboardClick}>
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default MainPG;
