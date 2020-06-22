import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-window',
  templateUrl: './question-window.component.html',
  styleUrls: ['./question-window.component.scss']
})
export class QuestionWindowComponent implements OnInit {
  @Input() selectedQuestion;
  @Output() backEmmiter: EventEmitter<number> = new EventEmitter();
  answer: string;
  windowIsActive = true;
  constructor() { }

  ngOnInit() {
  }

  submitAnswer() {
    if (this.answer === this.selectedQuestion.answer) {
      this.backEmmiter.emit(this.selectedQuestion.value);
    } else {
      this.windowIsActive = false;
    }
  }

  back() {
    this.backEmmiter.emit(0);
  }
}
