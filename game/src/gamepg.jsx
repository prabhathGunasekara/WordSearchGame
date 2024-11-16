import React, { useState, useEffect } from "react";
import "./WordSearchGame.css";

const WORDS = ["APPLE", "TABLE", "MAN", "VALORENT", "PIZZA", "CRICKET", "MANGO"];
const GRID_SIZE = 10;

function WordSearchGame() {
  const [grid, setGrid] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [timer, setTimer] = useState(60);
  const [score, setScore] = useState(0);
  const [selectedCells, setSelectedCells] = useState([]);

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
    }
  }, [timer, score]);

  const initializeGrid = () => {
    let tempGrid = Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
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

    const word = cells.map(cell => grid[cell.row][cell.col]).join("");

    // Check both directions
    if (WORDS.includes(word)) return word;
    const reversedWord = word.split("").reverse().join("");
    if (WORDS.includes(reversedWord)) return reversedWord;

    return "";
  };

  const handleGetExtraTime = () => {
    alert("API called for extra time!");
    setTimer(timer + 60);
  };

  const isSelected = (row, col) => {
    return selectedCells.some(cell => cell.row === row && cell.col === col);
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
                  className={`grid-cell ${isSelected(rowIndex, colIndex) ? "selected" : ""}`}
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
        <p>Time: <span className="timer">{timer > 0 ? timer.toFixed(2) : "0.00"}</span></p>
        <p>Score: <span className="score">{score}</span></p>
      </div>
      <div className="extra-time">
        <span onClick={handleGetExtraTime} className="get-extra-time">
          Get Extra Time
        </span>
        <button onClick={handleGetExtraTime} className="extra-time-button">60 Sec</button>
      </div>
    </div>
  );
}

export default WordSearchGame;
