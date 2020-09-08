import React, { useState, useEffect } from 'react';
import './App.css';
import initialCells from "./board.json";
import solution from "./solution.json";

function App() {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  const [cells, setCells] = useState(initialCells);
  const startTime = Date.now();

  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const selectedColor = "#F0E68C";
  const white = "#FFFFFF";

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


  const formatTime = (t) => {
    return ("0" + t).slice(-2);
  };

  const handleCellClick = (row, col) => () => {
    const newCells = [...cells];
    const selected = newCells[row][col].selected;
    newCells[row][col].color = selected ? white : selectedColor;
    newCells[row][col].selected = !selected;
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
    setCells(initialCells); //FIXME: mladra: Not working :(
  };

  const handleClearSelectionClick = () => {
    const newCells = cells.map(cellRow => cellRow.map(cell => {
      cell.selected = false;
      cell.color = white;
      return cell;
    }))
    setCells(newCells);
  };
  
  return (
    <>
    <div className="top-bar">
      {hours}:{minutes}:{seconds}
    </div>
    <div className="container">
      <div className="game">
        {rows.map(row =>
          <div className="row" key={`row-${row}`}>
            {
              cols.map(col => <div key={`${row}-${col}`} type="button" id="id" className="row-item" style={{ backgroundColor: cells[row][col].color }} onClick={handleCellClick(row, col)}><h2>{cells[row][col].value}</h2></div>)
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
          <div className="row">
            <button type="button" className="nums-button" onClick={handleClearSelectionClick}>Clear selection</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
