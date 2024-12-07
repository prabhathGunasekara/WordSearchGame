import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BananaGame.css";

function BananaGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrl = location.state?.returnUrl || "/gamepg";

  const handleFinishGame = () => {
    navigate(returnUrl, { state: { extraTime: 60 } });  
  };

  return (
    <div className="banana-game-container">
      <iframe
        src="https://marcconrad.com/uob/banana/index.php"
        title="Banana Game"
        className="banana-game-frame"
      ></iframe>
      <button className="complete-game-button" onClick={handleFinishGame}>
        Complete Game
      </button>
    </div>
  );
}

export default BananaGame;
