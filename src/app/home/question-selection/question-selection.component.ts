import { Component, OnInit } from '@angular/core';
import { StateManagmentService } from 'src/app/shared/services/state-managment.service';

@Component({
  selector: 'app-question-selection',
  templateUrl: './question-selection.component.html',
  styleUrls: ['./question-selection.component.scss']
})
export class QuestionSelectionComponent implements OnInit {
  questions = ['Movies', 'Wheather', 'Education', 'Logistics'];
  selectedQuestion: string;
  constructor(
    public stateManagmentService: StateManagmentService
  ) { }

  ngOnInit() {
  }

  submitQuestion(question) {
    this.selectedQuestion = question;
    this.stateManagmentService.questionsCategory.next(question);
  }

}
