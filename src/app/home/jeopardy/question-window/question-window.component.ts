import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-window',
  templateUrl: './question-window.component.html',
  styleUrls: ['./question-window.component.scss']
})
export class QuestionWindowComponent implements OnInit {
  @Input() selectedQuestion;
  @Output() backEmmiter: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  back() {
    this.backEmmiter.emit(true);
  }
}
