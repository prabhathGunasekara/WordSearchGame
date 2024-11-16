import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./leaderboard.css";

function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: "Sam", score: 5 },
    { rank: 2, name: "Kasun", score: 7 },
    { rank: 3, name: "", score: "" },
    { rank: 4, name: "", score: "" },
    { rank: 5, name: "", score: "" },
  ];

  return (
    <div className="leaderboard-container">
      <h1>LeaderBoard</h1>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <span className="leaderboard-rank">Rank</span>
          <span className="leaderboard-name">Name</span>
          <span className="leaderboard-score">Score</span>
        </div>
        {leaderboardData.map((entry) => (
          <div key={entry.rank} className="leaderboard-row">
            <span className="leaderboard-rank">{entry.rank}</span>
            <span className="leaderboard-name">{entry.name}</span>
            <span className="leaderboard-score">{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
