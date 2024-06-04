import React, { useEffect, useState } from 'react';
import SudokuBoard from '../../components/SudokuBoard';
import { generateNewPuzzle, loadGameProgress, saveGameProgress, isSolved } from '../../services/sudokuService';
import { getCurrentUser } from '../../services/authService';

const GamePage = () => {
  const [board, setBoard] = useState([]);
  const [solved, setSolved] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    const loadGame = async () => {
      const savedGame = await loadGameProgress(user.id);
      if (savedGame) {
        setBoard(savedGame);
        setSolved(isSolved(savedGame));
      } else {
        const newPuzzle = generateNewPuzzle();
        setBoard(newPuzzle);
        setSolved(isSolved(newPuzzle));
      }
    };
    loadGame();
  }, [user.id]);

  const handleBoardChange = (newBoard) => {
    setBoard(newBoard);
    saveGameProgress(user.id, newBoard);
    setSolved(isSolved(newBoard));
  };

  return (
    <div>
      <h1>Sudoku Game</h1>
      {solved && <p>Congratulations! You solved the puzzle.</p>}
      <SudokuBoard board={board} onBoardChange={handleBoardChange} />
    </div>
  );
};

export default GamePage;