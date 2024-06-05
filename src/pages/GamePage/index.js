import React, { useEffect, useState } from 'react';
import SudokuBoard from '../../components/SudokuBoard';
import { generateNewPuzzle, loadGameProgress, saveGameProgress, isSolved } from '../../services/sudokuService';
import { getCurrentUser } from '../../services/authService';

const GamePage = () => {
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [solved, setSolved] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    const loadGame = async () => {
      if (user) {
        const savedGame = await loadGameProgress(user.email);
        if (savedGame) {
          setBoard(savedGame);
          setSolved(isSolved(savedGame));
        } else {
          const newPuzzle = generateNewPuzzle();
          setBoard(newPuzzle);
          setSolved(isSolved(newPuzzle));
        }
      }
    };
    loadGame();
  }, [user]);

  const handleBoardChange = (newBoard) => {
    setBoard(newBoard);
    // Save the game progress when the board changes
    saveGameProgress(user.email, newBoard);
    setSolved(isSolved(newBoard));
  };

  const handleSaveButtonClick = () => {
    saveGameProgress(user.email, board);
  };

  return (
    <div>
      <h1>Sudoku Game</h1>
      {solved && <p>Congratulations! You solved the puzzle.</p>}
      <SudokuBoard board={board} onBoardChange={handleBoardChange} />
      <button onClick={handleSaveButtonClick}>Save</button>
    </div>
  );
};

export default GamePage;
