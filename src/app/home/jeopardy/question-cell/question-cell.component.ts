import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-question-cell',
  templateUrl: './question-cell.component.html',
  styleUrls: ['./question-cell.component.scss']
})
export class QuestionCellComponent implements OnInit {
  @Input() question: any;
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

}
