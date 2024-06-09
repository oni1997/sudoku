import React from 'react';
import PropTypes from 'prop-types';

const SudokuBoard = ({ board, onBoardChange }) => {
  if (!board) {
    return <div>Loading...</div>;
  }

  const handleChange = (row, col, value) => {
    const newBoard = board.map((rowArr, rowIndex) => 
      rowArr.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
    );
    onBoardChange(newBoard);
  };

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="text"
              value={cell || ''}
              onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

SudokuBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.null]))).isRequired,
  onBoardChange: PropTypes.func.isRequired,
};

export default SudokuBoard;