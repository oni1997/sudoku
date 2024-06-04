import React, { useState } from 'react';
import SudokuCell from '../SudokuCell';

const SudokuBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));

  const handleCellChange = (row, col, value) => {
    const newBoard = [...board];
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, colIndex) => (
            <SudokuCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onChange={(value) => handleCellChange(rowIndex, colIndex, value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;