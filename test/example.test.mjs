import { expect } from "chai";
import { createBoard } from "../src/example.mjs";

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


});
