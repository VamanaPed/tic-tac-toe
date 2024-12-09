function makeBoard(size) {
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
    for (let x = 0; x < size; x++) {
      if (tiles[yPos * size + x] !== symbol) break;
      if (x == size - 1) return true;
    }

    for (let y = 0; y < size; y++) {
      if (tiles[y * size + xPos] !== symbol) break;
      if (y == size - 1) return true;
    }
    for (let i = 0; i < size; i++) {
      if (tiles[i * size + i] !== symbol) break;
      if (i == size - 1) return true;
    }

    for (let i = 0; i < size; i++) {
      if (tiles[(size - 1 - i) * size + i] !== symbol) break;
      if (i == size - 1) return true;
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

  return { tiles, placeTile, placeTileAlternating, printBoard, length, size };
}

const app = (function () {
  const main = document.getElementById("main");

  function makeTiles(size, callback) {
    let string = "";
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.onclick = () => {
          const result = callback(y, x);
          tile.textContent = result;
        };
        main.appendChild(tile);
      }
      string += " 1fr";
    }

    main.style.gridTemplateColumns = string;
    main.style.height = `${size * 61}px`;
    main.style.width = `${size * 61}px`;
  }

  return { makeTiles };
})();

function resetBoard(size) {
  main.textContent = "";
  const board = makeBoard(size);
  app.makeTiles(board.size, board.placeTileAlternating);
}

// Start of app
resetBoard(3);
