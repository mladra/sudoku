import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import easyBoard from "./puzzles/easy.json";
import mediumBoard from "./puzzles/medium.json";
import hardBoard from "./puzzles/hard.json";
import Color from 'color';

function App() {
  const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  const selectedColor = "#F0E68C";
  const [variant, setVariant] = useState("1");

  const initialCellValue = {
    color: "",
    value: "",
    selected: false,
    corners: [],
    editable: true
  };
  const [startTime, setStartTime] = useState(Date.now());

  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const [isMouseDown, setMouseDown] = useState(false);
  const [isControlDown, setControlDown] = useState(false);

  const gameDivRef = useRef(null);

  const loadVariant = board => {
    return board.map(row => row.map(cell => {
      return {
        color: initialCellValue.color,
        value: cell.value,
        selected: initialCellValue.selected,
        corners: initialCellValue.corners,
        editable: cell.value ? false : true
      }
    }));
  };

  const [cells, setCells] = useState(loadVariant(easyBoard));

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
  }, [startTime]);

  const formatTime = (t) => {
    return ("0" + t).slice(-2);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (event.target && (event.target.type === "button" || event.target.type === "select-one" || event.target.localName === "option")) return;

      if (gameDivRef.current && !gameDivRef.current.contains(event.target)) {
        const newCells = cells.map(cellsRow => cellsRow.map(cell => {
          cell.selected = false;
          return cell;
        }));

        setCells(newCells);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [gameDivRef, cells]);

  useEffect(() => {
    const listenForKeyPress = event => {
      const num = Number(event.key);
      if (!Number.isNaN(num) && num >= 1 && num <= 9) {
        changeCellsNumber(event.key);
      } else if (event.key === "Delete") {
        eraseCellsValue();
      } else if (event.key === "Control") {
        setControlDown(true);
      }
    };

    const listenForKeyRelease = event => {
      if (event.key === "Control") {
        setControlDown(false);
      }
    };

    document.addEventListener("keydown", listenForKeyPress);
    document.addEventListener("keyup", listenForKeyRelease);
    return () => {
      document.removeEventListener("keydown", listenForKeyPress);
      document.removeEventListener("keyup", listenForKeyRelease);
    }
    // eslint-disable-next-line
  }, []);

  const handleCellClick = (rowIdx, colIdx) => () => {
    const newCells = isControlDown ? [...cells] : cells.map(row => row.map(cell => {
      cell.selected = false;
      return cell;
    }));
    newCells[rowIdx][colIdx].selected = true;
    setCells(newCells);
  };

  const handleButtonClick = (value) => () => {
    changeCellsNumber(value);
  };

  const changeCellsNumber = value => {
    const newCells = cells.map(cellsRow => cellsRow.map(cell => {
      if (cell.selected && cell.editable) cell.value = value;
      return cell;
    }));

    setCells(newCells);
  };

  const handleDeleteButtonClick = () => {
    eraseCellsValue();
  };

  const eraseCellsValue = () => {
    const newCells = cells.map(cellsRow => cellsRow.map(cell => {
      if (cell.selected && cell.editable) cell.value = "";
      return cell;
    }));

    setCells(newCells);
  };

  const handleCheckButtonClick = () => {
    const solved = checkIfSolved();
    window.alert(`Solved: ${solved}`);
  };

  const checkIfSolved = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const num = cells[i][j].value;
        if (!num) return false;

        const occurrencesRow = cells[i].reduce((a, b) => (b.value === num ? a + 1 : a), 0);

        let occurrencesCol = 0;
        for (let k = 0; k < 9; k++) {
          if (cells[k][j].value === num) {
            occurrencesCol++;
          }
        }

        let occurrencesSquare = 0;
        const [rowMin, rowMax] = i < 3 ? [0, 2] : i < 6 ? [3, 5] : [6, 8];
        const [colMin, colMax] = j < 3 ? [0, 2] : j < 6 ? [3, 5] : [6, 8];
        for (let k = rowMin; k <= rowMax; k++) {
          for (let l = colMin; l <= colMax; l++) {
            if (cells[k][l].value === num) {
              occurrencesSquare++;
            }
          }
        }

        if (occurrencesRow !== 1 || occurrencesCol !== 1 || occurrencesSquare !== 1) return false;
      }
    }

    return true;
  };

  const handleRestartButtonClick = () => {
    const board = variant === "1" ? easyBoard : variant === "2" ? mediumBoard : hardBoard;
    setCells(loadVariant(board));
  };

  const handleCellMouseEnter = (rowIdx, colIdx) => event => {
    if (isMouseDown) {
      const newCells = [...cells];
      newCells[rowIdx][colIdx].selected = true;
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

  const changeVariant = event => {
    const newVariant = event.target.value;
    setVariant(newVariant);
    const board = newVariant === "1" ? easyBoard : newVariant === "2" ? mediumBoard : hardBoard;
    setCells(loadVariant(board));
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    setStartTime(Date.now());
  };

  const addColors = (c1, c2) => {
    const color1 = Color(c1);
    const color2 = Color(c2);
    return color1.mix(color2);
  };

  return (
    <div onMouseUp={handleMouseUp}>
      <div className="top-bar">
        <p>{hours}:{minutes}:{seconds}</p>
        <div>
          <select name="sudoku-select" id="sudoku-select" style={{ marginBottom: "20px" }} onChange={changeVariant} value={variant}>
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </div>
      </div>
      <div className="container">
        <div ref={gameDivRef} className="game">
          {
            cells.map((row, rowIdx) =>
              <div className="row" key={`row-${rowIdx}`}>
                {
                  row.map((cell, colIdx) =>
                    <div
                      key={`${rowIdx}-${colIdx}`}
                      type="button"
                      id="id"
                      className={`
                        row-item 
                        item-border 
                        ${rowIdx === 0 ? 'item-border-top' : ''} 
                        ${colIdx === 0 ? 'item-border-left' : ''}
                        ${rowIdx === 2 || rowIdx === 5 || rowIdx === 8 ? 'item-border-bottom' : ''}
                        ${colIdx === 2 || colIdx === 5 || colIdx === 8 ? 'item-border-right' : ''}
                        `}
                      style={{
                        backgroundColor: cell.selected ? cell.color ? addColors(cell.color, selectedColor) : selectedColor : cell.color,
                        color: cell.editable ? "#0080ff" : "black"
                      }}
                      onClick={handleCellClick(rowIdx, colIdx)}
                      onMouseDown={handleMouseDown(rowIdx, colIdx)}
                      onMouseEnter={handleCellMouseEnter(rowIdx, colIdx)}>
                      <h2>{cell.value}</h2>
                    </div>)
                }
              </div>
            )}
        </div>

        <div className="controls">
          <div className="col">
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
      <div className="footer">
        <div>
          Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
        </div>
      </div>
    </div>
  );
}

export default App;
