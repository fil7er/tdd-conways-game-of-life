import fs from "fs";

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

export function parseRle(){

  
  let blockPatternData = fs.readFileSync("patterns/block.rle").toString();
  let data = blockPatternData.split("\n");
  data = data.filter((elem) => elem[0] != "#");
  let dataDim = data[0].split(", ru")[0];
  let dim = {};
  dim.x = parseInt(dataDim.split("x = ")[1].split(",")[0]);
  dim.y = parseInt(dataDim.split("y = ")[1]);
  let blockPattern = Array.from(Array(2), () => new Array(2));
  let pattern = data[1];
  for (let y=0; y<dim.y; y++){
    for(let x=0; x<dim.x; x++){
      blockPattern[y][x] = "o";
    }
  }

  return [blockPattern, pattern];
}