import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./WordSearchGame.css";

const WORDS = ["APPLE", "TABLE", "MAN", "VALORENT", "PIZZA", "CRICKET", "MANGO"];
const GRID_SIZE = 10;

function WordSearchGame() {
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [timer, setTimer] = useState(60);  
  const [score, setScore] = useState(0);
  const [selectedCells, setSelectedCells] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
     
    if (location.state?.extraTime) {
      setTimer((prevTimer) => prevTimer + location.state.extraTime);
       
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    initializeGrid();
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      alert(`Time's up! Your score is: ${score}`);
      saveScore();  
    }
  }, [timer, score]);

  const initializeGrid = () => {
    let tempGrid = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      )
    );

    WORDS.forEach((word) => {
      placeWordInGrid(word, tempGrid);
    });

    setGrid(tempGrid);
  };

  const placeWordInGrid = (word, grid) => {
    const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (direction === "horizontal" && col + word.length <= GRID_SIZE) {
        for (let i = 0; i < word.length; i++) {
          grid[row][col + i] = word[i];
        }
        placed = true;
      } else if (direction === "vertical" && row + word.length <= GRID_SIZE) {
        for (let i = 0; i < word.length; i++) {
          grid[row + i][col] = word[i];
        }
        placed = true;
      }
    }
  };

  const handleCellMouseDown = (row, col) => {
    setSelectedCells([{ row, col }]);
  };

  const handleCellMouseOver = (row, col) => {
    if (selectedCells.length > 0) {
      setSelectedCells((prev) => [...prev, { row, col }]);
    }
  };

  const handleMouseUp = () => {
    const selectedWord = getSelectedWord(selectedCells);
    if (WORDS.includes(selectedWord) && !foundWords.includes(selectedWord)) {
      setFoundWords([...foundWords, selectedWord]);
      setScore(score + 10);
    }
    setSelectedCells([]);
  };

  const getSelectedWord = (cells) => {
    if (cells.length < 2) return "";

    const word = cells.map((cell) => grid[cell.row][cell.col]).join("");

    if (WORDS.includes(word)) return word;
    const reversedWord = word.split("").reverse().join("");
    if (WORDS.includes(reversedWord)) return reversedWord;

    return "";
  };

  const handleGetExtraTime = () => {
    navigate("/bananagame", { state: { returnUrl: "/gamepg" } });
  };

  const saveScore = async () => {
    const userId = sessionStorage.getItem("userId");  
    if (!userId) {
      alert("You need to log in to save your score.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/user/${userId}/score`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });

      if (response.ok) {
        console.log("Score saved successfully!");
      } else {
        const errorMessage = await response.text();
        console.error("Error saving score:", errorMessage);
      }
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

  const handleGoToMain = () => {
    navigate("/mainpg");
  };

  const isSelected = (row, col) => {
    return selectedCells.some((cell) => cell.row === row && cell.col === col);
  };

  return (
    <div className="game-container" onMouseUp={handleMouseUp}>
      <h1>Find The Words</h1>
      <div className="grid-container">
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="grid-row">
              {row.map((letter, colIndex) => (
                <span
                  key={colIndex}
                  className={`grid-cell ${
                    isSelected(rowIndex, colIndex) ? "selected" : ""
                  }`}
                  onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                  onMouseOver={() => handleCellMouseOver(rowIndex, colIndex)}
                >
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="word-list">
          <h2>Words</h2>
          {WORDS.map((word, index) => (
            <p
              key={index}
              className={foundWords.includes(word) ? "found-word" : ""}
            >
              {word}
            </p>
          ))}
        </div>
      </div>
      <div className="info-section">
        <p>
          Time: <span className="timer">{timer > 0 ? timer : "0"}</span>
        </p>
        <p>
          Score: <span className="score">{score}</span>
        </p>
      </div>
      <div className="extra-time">
        <button onClick={handleGetExtraTime} className="extra-time-button">
          Get Extra 120 Seconds
        </button>
        <button onClick={handleGoToMain} className="go-to-main-button">
          Go to Main Page
        </button>
      </div>
    </div>
  );
}

export default WordSearchGame;
