import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  label: string[] = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  actionCount: number =0 ;
  cellActions: any[] = [];
  winningCombinations = [
    ["A", "B", "C"],
    ["D", "E", "f"],
    ["G", "H", "I"],
    ["A", "D", "G"],
    ["B", "E", "H"],
    ["C", "F", "I"],
    ["A", "E", "I"],
    ["C", "E", "G"]
  ];
  winner = "";

  ngOnInit(): void {
    setInterval(() => {
      this.checkForWinner();
    }, 1000);
  }

  checkForWinner() {
    this.winningCombinations.forEach((combination) => {
      this.didHeWon(combination);
    });
  }

  didHeWon(combination: string[]) {
    let whoWon = [0, 0, 0];
    combination.forEach((element, index) => {
      this.cellActions.forEach((cellAction) => {
        if (cellAction.hasOwnProperty(element)) {
          const result = cellAction[element]%2;
          if (result === 0) {
            whoWon[index] = 2;
          } else {
            whoWon[index] = 1;
          }
        }
      });
    });
    if (whoWon[0] === 1 && whoWon[1] === 1 && whoWon[2] == 1) {
      this.winner = "Player 1 won";
      this.label = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
      whoWon = [0, 0, 0];
    } else if (whoWon[0] === 2 && whoWon[1] === 2 && whoWon[2] == 2) {
      this.winner = "Player 2 won";
      this.label = ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
      whoWon = [0, 0, 0];
    }
  }

  handleClick(cellIdentification: string) {
    this.actionCount++;
    this.cellActions.push({[cellIdentification]: this.actionCount});
  }

  getLabel(cellIdentifier: string, index: number) {
    this.cellActions.forEach((cellAction) => {
      if (cellAction.hasOwnProperty(cellIdentifier)) {
        const result = cellAction[cellIdentifier]%2;
        if (result === 0) {
          this.label[index] = "O";
        } else {
          this.label[index] = "X";
        }
      } else {
        this.label[index] = "-";
      }
    });
  }
}
