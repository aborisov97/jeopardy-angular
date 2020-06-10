import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jeopardy',
  templateUrl: './jeopardy.component.html',
  styleUrls: ['./jeopardy.component.scss']
})
export class JeopardyComponent implements OnInit {
  selectedQuestion = false;
  constructor() { }

  ngOnInit() {
  }

}
