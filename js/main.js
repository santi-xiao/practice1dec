const boardID = document.getElementById("body-board");
const attemptsDiv = document.getElementById("attempts");
const timeMinutesDiv = document.getElementById("time-minutes");
const timeSecondsDiv = document.getElementById("time-seconds");
const radioPersonalized = document.getElementById("personalized");
const formDifficulty = document.getElementsByName("formDifficulty");
const formSettings = document.formSettings.settings;

// * Valores apagado, encendido, tablero e intentos
const off = 0;
const on = 1;
let attempts = 0;
let board = [];

// * Valores luces iniciales, filas y columnas
let startLigths = 15;
let rows = 5;
let columns = 5;

// * Nivel de dificultad del juego
let level = 0;

//  * EVENTO RADIO BUTTONS
formDifficulty[0].onchange = (e) => {
  if (e.target.value === "personalized") {
    formSettings.forEach((element) => {
      element.disabled = false;
    });
  } else {
    formSettings.forEach((element) => {
      element.disabled = true;
    });
  }
  level = e.target.value;
};

// * CAMBIA LAS FILAS Y COLUMNAS SEGUND LA DIFICULTAD
const changeDifficulty = () => {
  if (level == "easy") {
    rows = 5;
    columns = 5;
    startLigths = 15;
  } else if (level == "medium") {
    rows = 7;
    columns = 7;
    startLigths = 12;
  } else if (level == "hard") {
    rows = 10;
    columns = 10;
    startLigths = 10;
  } else if (level == "personalized") {
    if (
      +document.getElementById("rows").value == 0 ||
      +document.getElementById("columns").value == 0 ||
      +document.getElementById("ligths").value == 0
    ) {
      alert("Los parámetros pasados son incorrectos");
      return;
    }

    rows = +document.getElementById("rows").value;
    columns = +document.getElementById("columns").value;
    startLigths = +document.getElementById("ligths").value;
  }

  removeTableBoard();
  createBoard(rows, columns);
  drawBoard();
  initialLigths(startLigths);
};

// * DIBUJA UN BOARD EN EL HTML
const createBoard = (rows, columns) => {
  for (let i = 0; i < rows; i++) {
    board.push(new Array());
    for (let x = 0; x < columns; x++) {
      board[i].push(off);
    }
  }
  console.log("board", board);
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

// * LUCES INICIALES ALEATORIAS
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

// * METODO GANADOR
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

// * BORRAR LOS DIVS DEL TABLERO ANTERIOR
const removeTableBoard = () => {
  board = [];
  boardID.innerHTML = "";
};

createBoard(rows, columns);
drawBoard();
initialLigths(startLigths);
