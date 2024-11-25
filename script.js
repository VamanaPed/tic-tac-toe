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

const board = makeBoard(3);

board.placeTile(0, 1, "X");
board.placeTile(1, 1, "X");
board.placeTile(2, 1, "X");

board.printBoard();
