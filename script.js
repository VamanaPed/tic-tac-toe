function makeBoard(size) {
  let tiles = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      tiles.push("");
    }
  }
  const length = size * size;

  function placeTile(x, y, value) {
    if (tiles[y * size + x] === "") tiles[y * size + x] = value;
    const result = checkWin(x, y, value);
    if (result) console.log("WIN");
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

  return { tiles, placeTile, printBoard, length, size };
}

const app = (function () {
  const main = document.getElementById("main");

  let mySafeVar = 3;

  function logVar() {
    console.log(mySafeVar);
  }

  return { logVar };
})();

const board = makeBoard(3);
