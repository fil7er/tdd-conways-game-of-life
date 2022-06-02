export function createBoard(size) {
  let board = new Array;
  for (let i = 0; i < size; i++) board.push(new Array(size));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board[i][j] = "b";
    }
  }
  return board;
}