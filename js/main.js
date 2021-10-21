const off = 0;
const on = 1;
const board = [];
const boardID = document.getElementById("body-board");

// * DIBUJA UN BOARD EN EL HTML
const createBoard = (rows, columns) => {
  for (let i = 0; i < rows; i++) {
    board.push(new Array());
    for (let x = 0; x < columns; x++) {
      board[i].push(off);
    }
  }
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
};

// * CAMBIA EL ESTADO DE UN CUADRADO CLICKADO
const switchOnOff = (e) => {
  e.target.data == off ? (e.target.data = on) : (e.target.data = off);
  e.target.data == on
    ? (e.target.className = "ligthOn")
    : (e.target.className = "ligthOff");

  dominoEffect(e);
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
  });
  return;
};

createBoard(5, 4);
drawBoard();
