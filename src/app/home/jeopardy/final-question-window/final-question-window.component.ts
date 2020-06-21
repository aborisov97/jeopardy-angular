import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-final-question-window',
  templateUrl: './final-question-window.component.html',
  styleUrls: ['./final-question-window.component.scss']
})
export class FinalQuestionWindowComponent implements OnInit {
  @Input() finalQuestion;
  @Output() backEmmiter: EventEmitter<number> = new EventEmitter();
  answer: string;
  constructor() { }

  ngOnInit() {
  }

}
