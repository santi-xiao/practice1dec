const off = 0;
const on = 1;
const board = [];
const boardID = document.getElementById("body-board");

// Crear tablero
const createBoard = (rows, columns) => {
  for (let i = 0; i < rows; i++) {
    board.push(new Array());
    for (let x = 0; x < columns; x++) {
      board[i].push(0);
    }
  }
  return board;
};

const drawBoard = () => {
  for (let i = 0; i < board.length; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.id = `row${i}`;
    boardID.appendChild(rowDiv);
    for (let x = 0; x < board[i].length; x++) {
      let square = document.createElement("div");
      square.id = `square${i}-${x}`;
      rowDiv.appendChild(square);
    }
  }
};

createBoard(6, 6);
drawBoard();
console.log(board);
console.log(board[1][2]);
