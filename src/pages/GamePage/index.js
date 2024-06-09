import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuBoard from '../../components/SudokuBoard';
import { generateNewPuzzle, loadGameProgress, saveGameProgress, isSolved } from '../../services/sudokuService';
import { getCurrentUser, logout } from '../../services/authService';

const GamePage = () => {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [solved, setSolved] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const loadGame = async () => {
      if (user) {
        const savedGame = await loadGameProgress(user.email);
        if (savedGame && savedGame.board) {
          setBoard(savedGame.board);
          setSolution(savedGame.solution);
          setSolved(isSolved(savedGame.board));
        } else {
          const newPuzzle = generateNewPuzzle();
          setBoard(newPuzzle.puzzle);
          setSolution(newPuzzle.solution);
          setSolved(isSolved(newPuzzle.puzzle));
          saveGameProgress(user.email, { board: newPuzzle.puzzle, solution: newPuzzle.solution });
        }
      } else {
        navigate('/login');
      }
    };
    loadGame();
  }, [user, navigate]);

  // Add a check to ensure board is not undefined before accessing its length
  const boardLength = board && board.length;

  const handleBoardChange = (newBoard) => {
    setBoard(newBoard);
    saveGameProgress(user.email, { board: newBoard, solution });
    setSolved(isSolved(newBoard));
  };

  const handleSaveButtonClick = () => {
    saveGameProgress(user.email, { board, solution });
  };

  const handleLogoutButtonClick = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1>Sudoku Game</h1>
      {solved && <p>Congratulations! You solved the puzzle.</p>}
      {boardLength > 0 && <SudokuBoard board={board} onBoardChange={handleBoardChange} />}
      <div>
        <button onClick={handleSaveButtonClick}>Save</button>
        <button onClick={handleLogoutButtonClick}>Logout</button>
      </div>
    </div>
  );
};

export default GamePage;
