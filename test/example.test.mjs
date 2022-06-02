import { expect } from "chai";
import { createBoard, parseRle, drawPatterninBoard, movePatterinBoard } from "../src/example.mjs";

describe("Game of life", () => {
  it("Board array length of 16", () => {
    expect(createBoard(16).length).to.equal(16);
  });

  it("Board with only dead cells before parsing the pattern", () => {
    var board = createBoard(16);
    var isClean = true;
    for(let y=0; y< board.length; y++){
      for(let x=0; x< board.length; x++){
        if(board[y][x] != "b") isClean = false;
      }
    }
    expect(createBoard(16).length).to.equal(16);
  });

  it("Parsed block.rle", () => {
    expect(parseRle()[1]).to.equal("2o$2o!");
  });


  it("Draw pattern in the middle of board", () => {
    let board = drawPatterninBoard(createBoard(16), parseRle())[0];
    expect(board[7][7]).to.equal("o");
    expect(board[8][8]).to.equal("o");
    expect(board[7][8]).to.equal("o");
    expect(board[8][7]).to.equal("o");
  });


  it("Move pattern in board 1 time forward", () => {
    let board = drawPatterninBoard(createBoard(16), parseRle());
    let movedBoard = movePatterinBoard(board[0], board[1], board[2]);
    let display = movedBoard[0];
    expect(display[7][8]).to.equal("o");
    expect(display[8][9]).to.equal("o");
    expect(display[7][9]).to.equal("o");
    expect(display[8][8]).to.equal("o"); 
  });

  

});
