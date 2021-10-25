const boardID = document.getElementById("body-board");
const attemptsDiv = document.getElementById("attempts");
const timeMinutesDiv = document.getElementById("time-minutes");
const timeSecondsDiv = document.getElementById("time-seconds");
let attempts = 0;

const off = 0;
const on = 1;

const board = [];
let startLigths = 10;
let rows = 2;
let columns = 2;

// * DIBUJA UN BOARD EN EL HTML
const createBoard = (rows, columns) => {
  for (let i = 0; i < rows; i++) {
    board.push(new Array());
    for (let x = 0; x < columns; x++) {
      board[i].push(off);
    }
  }
  console.log(board);
  return board;
};

// * DIBUJA EN BOARD LOS CUADRADOS CON SUS PROPIEDADES
const drawBoard = () => {
  for (let i = 0; i < board.length; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.id = `row${i}`;
    boardID.appendChild(rowDiv);
    for (let x = 0; x < board[i].length; x++) {
      let square = document.createElement("div");
      square.id = `square${i}-${x}`;
      square.data = off;
      square.positiony = i;
      square.positionx = x;
      square.className = "ligthOff";
      square.onclick = switchOnOff;
      rowDiv.appendChild(square);
    }
  }
  // * TIMER
  // let minutes = 0;
  // let seconds = 0;
  // setInterval(() => {
  //   seconds += 1;
  //   if (seconds === 60) {
  //     seconds = 0;
  //     minutes += 1;
  //   }
  //   timeMinutesDiv.textContent = minutes;
  //   timeSecondsDiv.textContent = seconds;
  // }, 1000);
};

// * CAMBIA EL ESTADO DE UN CUADRADO CLICKADO
const switchOnOff = (e) => {
  e.target.data == off ? (e.target.data = on) : (e.target.data = off);
  e.target.data == on
    ? (e.target.className = "ligthOn")
    : (e.target.className = "ligthOff");
  board[e.target.positiony][e.target.positionx] == 0
    ? (board[e.target.positiony][e.target.positionx] = 1)
    : (board[e.target.positiony][e.target.positionx] = 0);

  console.log(board);
  dominoEffect(e);
  winnerMethod();
  attempts += 1;
  attemptsDiv.textContent = attempts;
};

// * RECOGE LOS CUADRADOS ADYACENTES AL CLICKADO
const dominoEffect = (e) => {
  const dominoLigths = [];

  const squareLessX = document.getElementById(
    `square${e.target.positiony}-${e.target.positionx - 1}`
  );

  const squareLessY = document.getElementById(
    `square${e.target.positiony - 1}-${e.target.positionx}`
  );

  const squarePlusX = document.getElementById(
    `square${e.target.positiony}-${e.target.positionx + 1}`
  );

  const squarePlusY = document.getElementById(
    `square${e.target.positiony + 1}-${e.target.positionx}`
  );

  dominoLigths.push(squareLessX, squareLessY, squarePlusX, squarePlusY);

  let noNullDominoLigths = dominoLigths.filter((square) => square !== null);

  return dominoSwitch(noNullDominoLigths);
};

// * CAMBIA EL ESTADO DE UN ARRAY DE CUADRADOS
const dominoSwitch = (squares) => {
  squares.forEach((square) => {
    square.data == off ? (square.data = on) : (square.data = off);
    square.data == off
      ? (square.className = "ligthOff")
      : (square.className = "ligthOn");
    board[square.positiony][square.positionx] == 0
      ? (board[square.positiony][square.positionx] = 1)
      : (board[square.positiony][square.positionx] = 0);
  });
  console.log(document.getElementById("body-board"));
};

// TODO: LUCES INICIALES ALEATORIAS
const initialLigths = (ligths) => {
  let squares = [];
  for (let i = 0; i < ligths; i++) {
    squares.push(
      document.getElementById(
        `square${Math.floor(Math.random() * board.length)}-${Math.floor(
          Math.random() * board[1].length
        )}`
      )
    );
  }
  squares.forEach((square) => {
    square.data = on;
    square.className = "ligthOn";
    board[square.positiony][square.positionx] = 1;
  });
  console.log(squares);
};

// TODO: METODO GANADOR
const winnerMethod = () => {
  const winscore = rows * columns;
  let points = 0;
  board.forEach((row) => {
    row.forEach((square) => {
      points += square;
    });
  });
  if (winscore === points) {
    console.log("You win!");
    console.log(boardID);
    boardID.style.pointerEvents = "none";
  }
};

createBoard(rows, columns);
drawBoard();
initialLigths(startLigths);
