import React from 'react';

const SudokuCell = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      value={value || ''}
      onChange={handleChange}
      maxLength={1}
      style={{ width: '30px', height: '30px', textAlign: 'center' }}
    />
  );
};

export default SudokuCell;