## Sudoku Game Application

This is a Sudoku game application built with React. It allows users to generate new puzzles, save their progress, and continue from where they left off. Users can also log in and out of the application.

### Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Communication Flow](#communication-flow)
- [License](#license)

### Features
- User authentication
- Generate new Sudoku puzzles
- Save and load game progress
- Detect if the Sudoku puzzle is solved
- Responsive UI

### Architecture
The application is structured as follows:

```
+---------+        +----------------------+        +-----------------+
|  User   | <----> |    User Interface    | <----> |   React State   |
+---------+        +----------------------+        +-----------------+
                       |       |        |                             
                       |       |        |                             
             +-----------------+        |                             
             |                          |                             
      +--------------+       +-------------------+                    
      | SudokuBoard  |       |  GamePage Logic   |                    
      +--------------+       +-------------------+                    
                              |       |       |                       
                              |       |       |                       
             +----------------+       |       |                       
             |                        |       |                       
+-----------------+    +-----------------+    +-------------------+   
| Sudoku Service  |    |  Auth Service   |    |  Backend Server   |   
+-----------------+    +-----------------+    +-------------------+   
```

### Installation
1. Clone the repository:
    ```
    git clone https://git@github.com:oni1997/sudoku.git
    cd sudoku-game
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Set up the backend server (assuming a Node.js backend):
    - Navigate to the backend directory:
      ```
      cd backend
      ```
    - Install backend dependencies:
      ```
      npm install
      ```
    - Start the backend server:
      ```
      npm start
      ```

4. Start the React application:
    ```
    npm start
    ```

### Usage
- Navigate to `http://localhost:3000` in your web browser.
- Log in or create a new account.
- Generate a new Sudoku puzzle or continue from your last saved game.
- Use the save button to save your progress.
- Log out when you are done.

### Project Structure
```
sudoku-game/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LoginForm/
│   │   │   └── index.js
│   │   ├── Profile/
│   │   │   └── index.js
│   │   ├── SignupForm/
│   │   │   └── index.js
│   │   ├── SudokuBoard/
│   │   │   ├── index.js
│   │   │   └── SudokuCell/
│   │   │       └── index.js
│   │   └── SudokuCell/
│   │       └── index.js
│   ├── pages/
│   │   ├── GamePage/
│   │   │   └── index.js
│   │   ├── LoginPage/
│   │   │   └── index.js
│   │   ├── ProfilePage/
│   │   │   └── index.js
│   │   └── SignupPage/
│   │       └── index.js
│   ├── server/
│   │   ├── data.json
│   │   └── server.js
│   ├── services/
│   │   ├── authService.js
│   │   ├── data.json
│   │   └── sudokuService.js
│   ├── utils/
│   │   └── sudokuUtils.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── webpack.config.js
```

### Communication Flow
1. **User**:
   - Interacts with the UI (User Interface)

2. **User Interface**:
   - `GamePage` component
     - Handles user interactions
     - Displays the Sudoku board (`SudokuBoard` component)
     - Buttons for saving progress and logging out
     - Fetches initial game state on load

3. **React Components**:
   - `GamePage` component
     - Uses `useEffect` to load game data on mount
     - Uses `useState` to manage `board`, `solution`, and `solved` states
     - Calls `loadGameProgress`, `saveGameProgress`, `generateNewPuzzle`, and `isSolved` from the Sudoku service
   - `SudokuBoard` component
     - Displays the Sudoku puzzle
     - Communicates board changes back to `GamePage`

4. **Sudoku Service**:
   - `generateNewPuzzle()`
     - Generates a new Sudoku puzzle and its solution
   - `loadGameProgress(email)`
     - Loads saved game progress for a user
   - `saveGameProgress(email, { board, solution })`
     - Saves the current game state for a user
   - `isSolved(board)`
     - Checks if the current board is solved

5. **Auth Service**:
   - `getCurrentUser()`
     - Retrieves the currently logged-in user
   - `logout()`
     - Logs out the current user

6. **Backend Server** (assumed as part of the system):
   - Handles requests to:
     - Load game progress
     - Save game progress

### License
This project is licensed under the MIT License. See the LICENSE file for more details.