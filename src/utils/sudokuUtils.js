const isValid = (board, row, col, value) => {
    if (board[row].includes(value)) {
      return false;
    }
  
    if (board.some(row => row[col] === value)) {
      return false;
    }
  
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === value && (i !== row || j !== col)) {
          return false;
        }
      }
    }
  
    return true;
  };
  
  export const isValidSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = board[row][col];
        if (value !== null && !isValid(board, row, col, value)) {
          return false;
        }
      }
    }
  
    return true;
  };
  
  export const generateSudokuSolution = () => {
    const board = Array(9).fill(null).map(() => Array(9).fill(null));
  
    const solveBoard = (board) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === null) {
            for (let value = 1; value <= 9; value++) {
              if (isValid(board, row, col, value)) {
                board[row][col] = value;
                if (solveBoard(board)) {
                  return true;
                }
                board[row][col] = null;
              }
            }
            return false;
          }
        }
      }
      return true;
    };
  
    solveBoard(board);
    return board;
  };
  
  export const removeCellsFromSolution = (solution, numCellsToRemove) => {
    const puzzle = [...solution.map(row => [...row])];
    const cells = [];
  
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        cells.push({ row, col });
      }
    }
  
    for (let i = 0; i < numCellsToRemove; i++) {
      const randomIndex = Math.floor(Math.random() * cells.length);
      const { row, col } = cells[randomIndex];
      puzzle[row][col] = null;
      cells.splice(randomIndex, 1);
    }
  
    return puzzle;
  };