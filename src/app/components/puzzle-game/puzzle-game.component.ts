import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.component.html',
  styleUrls: ['./puzzle-game.component.scss']
})
export class PuzzleGameComponent implements OnInit {

  blocks: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, -1]
  ];
  orignalBlock: number[][];
  gameFinished = false;

  constructor() { 
    this.orignalBlock = JSON.parse(JSON.stringify(this.blocks))
  }

  ngOnInit(): void {
    this.shuffle();
  }

  getOriginalX(value): number {
    for (let i = 0; i < this.orignalBlock.length; i++) {
      if (this.orignalBlock[i].indexOf(value) !== -1) {
        return this.orignalBlock[i].indexOf(value) * (-125);
      }
    }
  }

  getOriginalY(value): any {
    for (let i = 0; i < this.orignalBlock.length; i++) {
      if (this.orignalBlock[i].indexOf(value) !== -1) {
        return i * (-125);
      }
    }
  }

  move(row: number, column: number) {
    this.checkLeftRight(row, column);
    this.checkTopBottom(row, column);
    let isSame = true;
    for(var x = 0; x < this.blocks.length; x++){ 
      for(var y = 0; y < this.blocks[x].length; y++){
        if(this.blocks[x][y] !== this.orignalBlock[x][y]){
          isSame = false;
        }
      }
    }
    if(isSame){
      this.gameFinished = true;
    }
  }

  private checkTopBottom(row: number, column: number) {
    if (row === 0) {
      if (this.blocks[row + 1][column] === -1) {
        this.swopPlace(row, column, row + 1, column)
      }
    } else if (row === this.blocks.length - 1) {
      if (this.blocks[row - 1][column] === -1) {
        this.swopPlace(row, column, row - 1, column)
      }
    } else {
      if (this.blocks[row + 1][column] === -1) {
        this.swopPlace(row, column, row + 1, column)
      } else if (this.blocks[row - 1][column] === -1) {
        this.swopPlace(row, column, row - 1, column)
      }
    }
  }

  private checkLeftRight(row: number, column: number) {
    if (column === 0) {
      if (this.blocks[row][column + 1] === -1) {
        this.swopPlace(row, column, row, column + 1)
      }
    } else if (column === this.blocks[row].length - 1) {
      if (this.blocks[row][column - 1] === -1) {
        this.swopPlace(row, column, row, column - 1)
      }
    } else {
      if (this.blocks[row][column + 1] === -1) {
        this.swopPlace(row, column, row, column + 1)
      } else if (this.blocks[row][column - 1] === -1) {
        this.swopPlace(row, column, row, column - 1)
      }
    }
  }

  private swopPlace(startX: number, startY: number, endX, endY) {
    var tempi = this.blocks[startX][startY];
    var tempj = this.blocks[endX][endY];
    this.blocks[startX][startY] = tempj;
    this.blocks[endX][endY] = tempi;
  }

  shuffle() {
    this.gameFinished = false;
    for (var k = 0; k < this.blocks.length; k++) {
      for (var l = 0; l < this.blocks[k].length; l++) {
        var i = Math.floor(Math.random() * 3);
        var j = Math.floor(Math.random() * 3);
        this.swopPlace(k, l, i, j);
      }
    }
  }

}
