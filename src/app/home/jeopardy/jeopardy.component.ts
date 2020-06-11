import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jeopardy',
  templateUrl: './jeopardy.component.html',
  styleUrls: ['./jeopardy.component.scss']
})
export class JeopardyComponent implements OnInit {
  isSelectedQuestion = false;
  selectedQuestion: any;
  questions = [];
  rows = [4, 9, 14, 19];
  private jsonURL = '../assets/data/questions_test.json';

  constructor(private http: HttpClient) {
   this.getJSON().subscribe(data => {
    console.log(data);
    this.questions = data;
   });
  }

  public getJSON(): Observable<any> {
   return this.http.get(this.jsonURL);
  }

  ngOnInit() {
  }

  showQuestionWindow(question) {
    this.selectedQuestion = question;
    this.isSelectedQuestion = true;
  }
}
