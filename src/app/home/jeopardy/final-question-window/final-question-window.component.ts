import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
  }

  submitPlayerAnswer() {
    if (this.players > 0) {
      this.answers.push
      ({correct: this.currentPlayerAnswer === this.question.answer, playerNumber: this.playerCount++});
      this.players--;
      this.currentPlayerAnswer = '';
    }
    console.log(this.answers);
  }

  back() {
    this.backEmmiter.emit(this.answers);
  }

}
