function makeBoard(size, winLength = size) {
  let tiles = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      tiles.push("");
    }
  }
  const length = size * size;

  let xTurn = true;
  let gameFinished = false;

  function placeTile(x, y, value) {
    if (gameFinished) return;
    if (tiles[y * size + x] === "") tiles[y * size + x] = value;
    else return tiles[y * size + x];
    gameFinished = checkWin(x, y, value);
    return value;
  }

  function placeTileAlternating(x, y) {
    if (gameFinished) return;
    const result = placeTile(x, y, xTurn ? "X" : "O");
    xTurn = !xTurn;
    return result;
  }

  function checkWin(xPos, yPos, symbol) {
    let tally = 0;
    for (let x = 0; x < size; x++) {
      if (tiles[yPos * size + x] === symbol) {
        tally++;
      } else tally = 0;
      if (tally >= winLength) return true;
    }

    tally = 0;
    for (let y = 0; y < size; y++) {
      if (tiles[y * size + xPos] === symbol) {
        tally++;
      } else tally = 0;
      if (tally >= winLength) return true;
    }

    tally = 0;
    for (let i = 0; i < size; i++) {
      if (tiles[i * size + i] === symbol) {
        tally++;
      } else tally = 0;
      if (tally >= winLength) return true;
    }

    tally = 0;
    for (let i = 0; i < size; i++) {
      if (tiles[(size - 1 - i) * size + i] === symbol) {
        tally++;
      } else tally = 0;
      if (tally >= winLength) return true;
    }
  }

  function printBoard() {
    console.log("Printing Board");
    for (let y = 0; y < size; y++) {
      let text = y + ":";
      for (let x = 0; x < size; x++) {
        text +=
          tiles[y * size + x] === "" ? " - " : " " + tiles[y * size + x] + " ";
      }
      console.log(text + "\n");
    }
  }

  function gameOver() {
    return gameFinished;
  }

  return {
    tiles,
    placeTile,
    placeTileAlternating,
    printBoard,
    gameOver,
    length,
    size,
  };
}

const app = (function () {
  const main = document.getElementById("main");
  const content = document.getElementById("content");

  function makeTiles(size, callback, board, gameOverCallback) {
    let string = "";
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.onclick = () => {
          const result = callback(y, x);
          if (result != undefined) tile.textContent = result;
          if (board.gameOver()) gameOverCallback();
        };
        content.appendChild(tile);
      }
      string += " 1fr";
    }

    content.style.gridTemplateColumns = string;
    content.style.height = `${size * 62}px`;
    content.style.width = `${size * 62}px`;
    main.style.height = `${size * 62}px`;
    main.style.width = `${size * 62}px`;
  }

  return { makeTiles };
})();

// Start of app
const boardSizeInput = document.getElementById("size");
const rowLengthInput = document.getElementById("length");

const restartButton = document.getElementById("restart-button");

function showRestartButton() {
  restartButton.classList.remove("hidden");
}

function resetBoard() {
  content.textContent = "";
  const board = makeBoard(boardSizeInput.value, rowLengthInput.value);
  app.makeTiles(
    board.size,
    board.placeTileAlternating,
    board,
    showRestartButton
  );
  restartButton.classList.add("hidden");
}

resetBoard(3);
