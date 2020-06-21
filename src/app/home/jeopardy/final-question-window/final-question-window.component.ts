import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-final-question-window',
  templateUrl: './final-question-window.component.html',
  styleUrls: ['./final-question-window.component.scss']
})
export class FinalQuestionWindowComponent implements OnInit {

  @Input('finalQuestion') set finalQuestion(value: any) {
    this.question = value;
  }
  @Input() players;
  @Output() backEmmiter: EventEmitter<any> = new EventEmitter();
  question: any;
  currentPlayerAnswer = '';
  playerCount = 1;
  answers = [];
  playersLength: number;
  wagerAmount: number;
  // a bool variable to assign the players.lenght to the playersLength variable so playersLength can be decremented
  // for the submitPlayerAnswer function
  oneTimer = true;

  constructor() {
  }

  ngOnInit() {
  }

  submitPlayerAnswer() {
    if (this.oneTimer) {
      this.playersLength = this.players.length;
      console.log(this.playersLength);
      // setup forever to false
      this.oneTimer = false;
    }
    if (this.playersLength > 0) {
      if (this.players[this.playerCount - 1].score < this.wagerAmount) {
        alert('Wager must not be over the score');
      } else {
        this.answers.push(
          {
            correct: this.currentPlayerAnswer === this.question.answer,
            playerNumber: this.playerCount++,
            wager: this.wagerAmount
          });
        this.playersLength--;
        this.currentPlayerAnswer = '';
        this.wagerAmount = 0;
      }
    }
    console.log(this.answers);
  }

  back() {
    this.backEmmiter.emit(this.answers);
  }

}
