import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-selection',
  templateUrl: './question-selection.component.html',
  styleUrls: ['./question-selection.component.scss']
})
export class QuestionSelectionComponent implements OnInit {
  questions = ['Movies', 'Wheather', 'Education', 'Logistics'];
  constructor() { }

  ngOnInit() {
  }

  submitQuestion(question) {
    console.log(question);
  }

}
