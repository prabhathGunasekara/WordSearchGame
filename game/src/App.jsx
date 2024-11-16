import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePGX from "./home";
import Loginpg from "./login";
import MainPG from "./mainpg";
import Leaderboard from "./leaderboard";
import WordSearchGame from "./gamepg";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePGX />} />
        <Route path="/login" element={<Loginpg />} />
        <Route path="/mainpg" element={<MainPG />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/gamepg" element={<WordSearchGame />} />
      </Routes>
    </Router>
  );
}

export default App;
