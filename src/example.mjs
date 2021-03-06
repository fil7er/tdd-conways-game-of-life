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
  let pattern = data[1];
  return [dim, pattern];
}

export function drawPatterninBoard(board, pattern) {
  let initX= Math.floor(board.length / 2)-1;
  let initY= Math.floor(board.length / 2)-1;
  for (let y = initY; y < pattern[0].y + initY; y++) {
    for (let x = initX; x < pattern[0].x + initX; x++) {
      board[y][x] = "o";
    }
  }
  let actualPos= {};
  actualPos.y = initY;
  actualPos.x = initX;
  return [board, actualPos, pattern[0]];
}

export function movePatterinBoard(board, patternPosition, dim) {
  let initX= patternPosition.x+1; // only Forward
  let initY= patternPosition.y;
  for (let y = initY; y < dim.y + initY; y++) {
    for (let x = initX; x < dim.x + initX; x++) {
      board[y][x] = "o";
    }
  }
  //Remove initial position
  for (let y = initY; y < dim.y + initY; y++) {
    board[y][patternPosition.x] = "b";
  }
  let actualPos= {};
  actualPos.y = initY;
  actualPos.x = initX;
  return [board, actualPos, dim];
}

export function exportBoardToRle(board, dim) {
  let finalString = "";

  let numO = 0;
  let numB = 0;
  for(let y=0; y< board.length; y++){
    for(let x=0; x< board.length; x++){
      switch(board[y][x]){
        case 'b' :  {
         if(numO > 0) {
          finalString = finalString+numO.toString()+"o";
          numO=0;
         }
         if(x == board.length-1 && numB > 0){
            numB++;
           finalString = finalString+numB.toString()+"b";
           break;
          }
         numB++;
         break;
        }
        case 'o' : {
          if(numB > 0) {
            finalString = finalString+numB.toString()+"b";
            numB=0;
          }
          if(x == board.length-1 && numO > 0) {
            numO++;
            finalString = finalString+numB.toString()+"o";
            break;
          }
          numO++;
          break;
        }
      }
    }
    numB=0; 
    numO=0;
    finalString = finalString+"$";
  }
  finalString = finalString+"!";

  if (fs.existsSync("output.rle")) fs.unlinkSync("output.rle");
  fs.writeFileSync(
    "output.rle", "#N Output\n" +
    "x = " +dim.x +
      ", y = " +dim.y +
      ", rule = B3/S23\n" +
      finalString
  );
  return finalString;
}
