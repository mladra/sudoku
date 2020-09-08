import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import initialCells from "./board.json";
import solution from "./solution.json";

function App() {
  const rows = 9;
  const cols = 9;
  const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const selectedColor = "#F0E68C";
  const white = "#FFFFFF";

  const [cells, setCells] = useState(new Array(rows).fill().map(() => new Array(cols).fill().map(() => Object.assign({}, { color: white, value: "", selected: false }))));
  const startTime = Date.now();

  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const [isMouseDown, setMouseDown] = useState(false);
  const [isControlDown, setControlDown] = useState(false);

  const gameDivRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Date.now() - startTime;

      const h = Math.floor(delta / 1000 / 60 / 60);
      const m = Math.floor((delta / 1000 - h * 3600) / 60);
      const s = Math.floor(delta / 1000 - m * 60 - h * 3600);

      setHours(formatTime(h));
      setMinutes(formatTime(m));
      setSeconds(formatTime(s));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (event.target.type === "button") return;

      if (gameDivRef.current && !gameDivRef.current.contains(event.target)) {
        const newCells = cells.map(cellsRow => cellsRow.map(cell => {
          cell.selected = false;
          cell.color = white;
          return cell;
        }));

        setCells(newCells);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);;
  }, [gameDivRef]);

  useEffect(() => {
    const listenForKeyPress = event => {
      if (event.keyCode === 17) {
        setControlDown(true);
      }
    };

    document.addEventListener("keydown", listenForKeyPress);
    return () => document.removeEventListener("keydown", listenForKeyPress);
  }, []);

  useEffect(() => {
    const listenForKeyRelease = event => {
      if (event.keyCode === 17) {
        setControlDown(false);
      }
    };

    document.addEventListener("keyup", listenForKeyRelease);
    return () => document.removeEventListener("keyup", listenForKeyRelease);
  }, []);

  const formatTime = (t) => {
    return ("0" + t).slice(-2);
  };

  const handleCellClick = (rowIdx, colIdx) => () => {
    const newCells = isControlDown ? [...cells] : cells.map(row => row.map(cell => {
      cell.selected = false;
      cell.color = white;
      return cell;
    }));
    newCells[rowIdx][colIdx].selected = true;
    newCells[rowIdx][colIdx].color = selectedColor;
    setCells(newCells);
  };

  const handleButtonClick = (value) => () => {
    const newCells = cells.map(cellsRow => cellsRow.map(cell => {
      if (cell.selected) cell.value = value;
      return cell;
    }));

    setCells(newCells);
  };

  const handleDeleteButtonClick = () => {
    const newCells = cells.map(cellsRow => cellsRow.map(cell => {
      if (cell.selected) cell.value = "";
      return cell;
    }));

    setCells(newCells);
  };

  const handleCheckButtonClick = () => {
    const solved = checkIfSolved();
    window.alert(`Solved: ${solved}`);
  };

  const checkIfSolved = () => {
    const arr1 = cells.flatMap(row => row.map(r => r.value));
    const arr2 = solution.flatMap(row => row.map(r => r.value));
    const missing = arr1.find((num, idx) => arr2[idx] !== num);
    return missing === undefined;
  };

  const handleRestartButtonClick = () => {
    //TODO: mladra: To implement...
  };

  const handleCellMouseEnter = (rowIdx, colIdx) => event => {
    if (isMouseDown) {
      const newCells = [...cells];
      newCells[rowIdx][colIdx].selected = true;
      newCells[rowIdx][colIdx].color = selectedColor;
      setCells(newCells);
    }
  };

  const handleMouseDown = (rowIdx, colIdx) => () => {
    setMouseDown(true);
    handleCellClick(rowIdx, colIdx)();
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const styling = (rowIdx, colIdx, cell) => {
    const styling = { 
      backgroundColor: cell.color,
      borderRight: "1px solid black",
      borderBottom: "1px solid black" 
    };

    if (rowIdx === 0) {
      styling.borderTop = "3px solid black";
    }

    if (colIdx === 0) {
      styling.borderLeft = "3px solid black";
    }

    if (rowIdx === 8 || rowIdx === 2 || rowIdx === 5) {
      styling.borderBottom = "3px solid black";
    }

    if (colIdx === 8 || colIdx === 2 || colIdx === 5) {
      styling.borderRight = "3px solid black";
    }

    return styling;
  };



  return (
    <>
      <div className="top-bar">
        {hours}:{minutes}:{seconds}
      </div>
      <div className="container">
        <div ref={gameDivRef} className="game">
          {cells.map((row, rowIdx) =>
            <div className="row" key={`row-${rowIdx}`}>
              {
                row.map((cell, colIdx) =>
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    type="button"
                    id="id"
                    className="row-item"
                    style={styling(rowIdx, colIdx, cell)}
                    onClick={handleCellClick(rowIdx, colIdx)}
                    onMouseDown={handleMouseDown(rowIdx, colIdx)}
                    onMouseUp={handleMouseUp}
                    onMouseEnter={handleCellMouseEnter(rowIdx, colIdx)}>
                    <h2>{cell.value}</h2>
                  </div>)
              }
            </div>
          )}
        </div>

        <div className="controls">
          <div className="col">
            <h2 style={{ textAlign: "center" }}>Controls</h2>
            {
              nums.map(numsRow =>
                <div className="row" key={`nums-row-${numsRow}`}>
                  {
                    numsRow.map(num =>
                      <button key={`nums-row-${numsRow}-num-${num}`} type="button" className="nums-button" onClick={handleButtonClick(num)}>{num}</button>
                    )
                  }
                </div>
              )
            }
            <div className="row">
              <button type="button" className="nums-button" onClick={handleDeleteButtonClick}>Delete</button>
              <button type="button" className="nums-button" onClick={handleCheckButtonClick}>Check</button>
              <button type="button" className="nums-button" onClick={handleRestartButtonClick}>Restart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
