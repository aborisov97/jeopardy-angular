import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { StateManagmentService } from 'src/app/shared/services/state-managment.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-jeopardy',
  templateUrl: './jeopardy.component.html',
  styleUrls: ['./jeopardy.component.scss']
})
export class JeopardyComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  isSelectedQuestion = false;
  selectedQuestion: any;
  questions = [];
  rows = [4, 9, 14, 19];
  players = [];
  playerNumber: number;
  questionsCategory: string;
  private jsonURL = '../assets/data/questions_test.json';

  constructor(
    private http: HttpClient,
    public stateManagmentService: StateManagmentService
  ) {

    this.getJSON().subscribe(data => {
      console.log(data);
      this.questions = data;
    });
  }

  public getJSON(): Observable<any> {
   return this.http.get(this.jsonURL);
  }

  ngOnInit() {
    this.stateManagmentService.startGame.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      if (res) {
        this.playerNumber = res.playerCount;
        this.questionsCategory = res.questionsCategory;
        this.initPlayers();
      }
    });
  }

  initPlayers() {
    for (let i = 0 ; i < this.playerNumber ; i++) {
      this.players.push({playerNumber: `Player ${i + 1}`, score: 0});
    }
  }

  showQuestionWindow(question) {
    this.selectedQuestion = question;
    this.isSelectedQuestion = true;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
