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
  let moveCount = 0;

  function placeTile(x, y, value) {
    if (gameFinished) return;
    if (tiles[y * size + x] === "") tiles[y * size + x] = value;
    else return undefined;
    gameFinished = checkWin(x, y, value);
    moveCount++;
    return value;
  }

  function placeTileAlternating(x, y) {
    if (gameFinished) return;
    const result = placeTile(x, y, xTurn ? "X" : "O");
    if (result === undefined) return undefined;
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

  function gameStuck() {
    return moveCount >= size * size - size;
  }

  return {
    tiles,
    placeTile,
    placeTileAlternating,
    printBoard,
    gameOver,
    gameStuck,
    length,
    size,
  };
}

const app = (function () {
  const main = document.getElementById("main");
  const content = document.getElementById("content");

  function makeTiles(
    size,
    placeTileCallback,
    board,
    gameOverCallback,
    gameStuckCallback
  ) {
    let string = "";
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.onclick = () => {
          const result = placeTileCallback(y, x);
          if (result !== undefined) {
            tile.textContent = result;
            if (board.gameOver()) gameOverCallback(result);
            else if (board.gameStuck()) gameStuckCallback();
          }
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

const message = document.getElementById("message");
const restartButton = document.getElementById("restart-button");

function showGameOver(winner) {
  message.textContent = winner + " Wins";
  message.classList.remove("hidden");
  restartButton.classList.remove("hidden");
}

function showRestartGame() {
  message.textContent = "Restart?";
  message.classList.remove("hidden");
  restartButton.classList.remove("hidden");
}

function resetBoard() {
  content.textContent = "";
  const board = makeBoard(boardSizeInput.value, rowLengthInput.value);
  app.makeTiles(
    board.size,
    board.placeTileAlternating,
    board,
    showGameOver,
    showRestartGame
  );

  message.classList.add("hidden");
  restartButton.classList.add("hidden");
}

resetBoard(3);
