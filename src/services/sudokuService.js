import { isValidSudoku, generateSudokuSolution, removeCellsFromSolution } from '../utils/sudokuUtils';

export const generateNewPuzzle = () => {
  const solution = generateSudokuSolution();
  const puzzle = removeCellsFromSolution(solution, 50);
  return puzzle;
};

export const isValidMove = (board, row, col, value) => {
  const newBoard = [...board.map(row => [...row])];
  newBoard[row][col] = value;

  return isValidSudoku(newBoard);
};

export const isSolved = (board) => {
  return isValidSudoku(board);
};

export const saveGameProgress = async (userId, board) => {
  try {
    const response = await fetch('/api/saveGameProgress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, board })
    });

    if (!response.ok) {
      throw new Error('Failed to save game progress');
    }
  } catch (error) {
    console.error('Error saving game progress:', error);
  }
};

export const loadGameProgress = async (userId) => {
  try {
    const response = await fetch(`/api/loadGameProgress/${userId}`);
    const board = await response.json();
    return board;
  } catch (error) {
    console.error('Error loading game progress:', error);
    return null;
  }
};