import React, { useState, useEffect } from "react";
import "./leaderboard.css";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);

   
  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("http://localhost:8080/user/leaderboard");  
      if (response.ok) {
        const data = await response.json();
        setLeaderboardData(data);
      } else {
        console.error("Failed to fetch leaderboard data.");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <span className="leaderboard-rank">Rank</span>
          <span className="leaderboard-name">Name</span>
          <span className="leaderboard-score">Score</span>
        </div>
        {leaderboardData.length > 0 ? (
          leaderboardData.map((entry, index) => (
            <div key={index} className="leaderboard-row">
              <span className="leaderboard-rank">{index + 1}</span>
              <span className="leaderboard-name">{entry.name || "Anonymous"}</span>
              <span className="leaderboard-score">{entry.score}</span>
            </div>
          ))
        ) : (
          <div className="leaderboard-row">No data available.</div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
