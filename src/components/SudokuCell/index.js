import React, { useState } from 'react';

const SudokuCell = ({ value, solutionValue, onChange }) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [isCorrect, setIsCorrect] = useState(true);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    if (newValue === solutionValue.toString()) {
      setIsCorrect(true);
      onChange(newValue);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      maxLength={1}
      className={`sudoku-cell ${isCorrect ? '' : 'incorrect'}`}
      style={{ width: '30px', height: '30px', textAlign: 'center' }}
    />
  );
};

export default SudokuCell;
