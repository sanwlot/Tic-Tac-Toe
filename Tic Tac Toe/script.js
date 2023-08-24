const cells = document.querySelectorAll(".cell");
const playerX = document.querySelector(".player-x");
const playerO = document.querySelector(".player-o");
const tie = document.querySelector(".tie");

let currentPlayer = "X";
let playerXWinCount = 0;
let playerOWinCount = 0;
let tieCount = 0;
let turnsCounter = 0;

const gameBoard = [
  { id: 0, content: "", marked: false },
  { id: 1, content: "", marked: false },
  { id: 2, content: "", marked: false },
  { id: 3, content: "", marked: false },
  { id: 4, content: "", marked: false },
  { id: 5, content: "", marked: false },
  { id: 6, content: "", marked: false },
  { id: 7, content: "", marked: false },
  { id: 8, content: "", marked: false },
];

const winningPatterns = [
  [0, 1, 2],  // horizontal
  [3, 4, 5],
  [6, 7, 8], 
  [0, 3, 6],  // vertical
  [1, 4, 7],
  [2, 5, 8], 
  [0, 4, 8],  // diagonal
  [2, 4, 6], 
];

function checkWin(player) {
  return winningPatterns.some((pattern) => {
    return pattern.every((index) => gameBoard[index].content === player);
  });
}

function renderGameBoard() {
  cells.forEach((cell, i) => {
    cell.textContent = gameBoard[i].content;
  });
}

// Event handling
cells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    if (!gameBoard[i].marked) {
      gameBoard[i].marked = true;
      gameBoard[i].content = currentPlayer;
      turnsCounter++;

      if (checkWin(currentPlayer)) {
        if (currentPlayer === "X") {
          playerXWinCount++;
          playerX.innerHTML = `PLAYER X <br><br>${playerXWinCount}`;
          turnsCounter = 0;
          alert("X won");
        }
        if (currentPlayer === "O") {
          playerOWinCount++;
          playerO.innerHTML = `PLAYER O <br><br>${playerOWinCount}`;
          turnsCounter = 0;
          alert("O won");
        }
        resetGame();
      }
      if (turnsCounter === 9) {
        tieCount++;
        tie.innerHTML = `TIE <br><br>${tieCount}`;
        turnsCounter = 0;
        alert("Tied");
        resetGame();
      }
      renderGameBoard(); // DOM
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

function resetGame() {
  gameBoard.forEach((cell) => {
    cell.content = "";
    cell.marked = false;
  });
}

// TIC TAC TOE

/*

About this game:
  This is a two player game. 
  Played on 3 * 3 grid.
  Every player gets a turn in which they mark 'X' or 'O' 
  If any player is successful making a pattern of their marks ('X' or 'O') That player wins the game.
  There are 8 pattern 3 horizontal, 3 vertical and 2 diagonal back-to-back marks.

  Rules:
    Once marked the 'O' or 'X' a player can not change or remove it

How to implement this game in JS:
  I am thinking about creating a array of objects and putting all game related data in that array.
  Every time when players take turn, I want to update the array with that data 
  And based on that data from array I want to render it to DOM 
  Basically I want to manage array because it will have all the data required to render the game.

Breaking it into smaller chunks:
  1) Making an Array that will handle complete game data.
  2) Create the minimal interface first



Challenges:
  1) How to handle turns of players, should I use loops and what would be the way to exit the loop ?
    -Instead of loops I will use event listeners on each block.
  2) How will the array looks like ?
    - Array will have objects and each object will represent block of the grid.
    - Each object will contain information like: 
      - 'X' or 'Y' mark according to players' move.
      - A boolean for making sure that we can not change the mark again.
      - ID of each block to identify each one of them
  3) How to declare a winner, the logic for it
    - I can set a condtion the event handler
    - If that condition is true then we can declare a winner
    

Steps: 
  1) Make the minimal interface of the game.
  2) Set the event listeners on the cells for identifying them.
  3) Create an array for storing game data.
  4) Add a condtion in event listener to change content, boolean of the array according to the event.
  5) Render DOM the updated array in the game board

*/

// First attempt

// const gameGrid = [
//   ["*", "*", "*"],
//   ["*", "*", "*"],
//   ["*", "*", "*"],
// ];
// const game = document.querySelector('.game')

// function renderGame() {
//     let gameGridHTML = ''

//     for (let i = 0; i < gameGrid.length; i++) {
//         const element = gameGrid[i];
//         for (let j = 0; j < element.length; j++) {
//             if (j === 2) {
//                 gameGridHTML += `<span>${element[j]}</span> <br>`
//             } else {
//                 gameGridHTML += `<span>${element[j]}</span>`
//             }
//         }
//     }
//     game.innerHTML = gameGridHTML
// }

// renderGame()

// while (true) {
//   let player1 = prompt("Player 1, select your move (from 1 to 9): ");
//   player1Move(player1);
//   console.log(gameGrid);

//   let player2 = prompt("Player 2, select your move (from 1 to 9): ");
//   player2Move(player2);
//   console.log(gameGrid);
// }

// function player1Move(player1) {
//   switch (Number(player1)) {
//     case 1:
//       gameGrid[0][0] = "X";
//       break;
//     case 2:
//       gameGrid[0][1] = "X";
//       break;
//     case 3:
//       gameGrid[0][2] = "X";
//       break;
//     case 4:
//       gameGrid[1][0] = "X";
//       break;
//     case 5:
//       gameGrid[1][1] = "X";
//       break;
//     case 6:
//       gameGrid[1][2] = "X";
//       break;
//     case 7:
//       gameGrid[2][0] = "X";
//       break;
//     case 8:
//       gameGrid[2][1] = "X";
//       break;
//     case 9:
//       gameGrid[2][2] = "X";
//       break;
//     default:
//       console.log("Invalid move");
//       break;
//   }
//   renderGame()
// }

// function player2Move(player2) {
//   switch (Number(player2)) {
//     case 1:
//       gameGrid[0][0] = "O";
//       break;
//     case 2:
//       gameGrid[0][1] = "O";
//       break;
//     case 3:
//       gameGrid[0][2] = "O";
//       break;
//     case 4:
//       gameGrid[1][0] = "O";
//       break;
//     case 5:
//       gameGrid[1][1] = "O";
//       break;
//     case 6:
//       gameGrid[1][2] = "O";
//       break;
//     case 7:
//       gameGrid[2][0] = "O";
//       break;
//     case 8:
//       gameGrid[2][1] = "O";
//       break;
//     case 9:
//       gameGrid[2][2] = "O";
//       break;
//     default:
//       console.log("Invalid move");
//       break;
//   }
//   renderGame()
// }
