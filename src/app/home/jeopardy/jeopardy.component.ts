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
  endRound = false;
  selectedQuestion: any;
  questions = [];
  // for rendering the tables
  rows = [4, 9, 14, 19];
  players = [];
  playerNumber: number;
  questionsCategory: string;
  currentPlayer: string;
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
      this.players.push({playerNumber: `Player ${i + 1}`, score: 0, myTurn: i === 0 ? true : false, winner: false});
    }
    this.currentPlayer = this.players[0].playerNumber;
  }

  showQuestionWindow(question) {
    this.selectedQuestion = question;
    this.isSelectedQuestion = true;
  }

  calculatePoints(event) {
    for (let i = 0 ; i < this.players.length ; i++) {
      if (this.players[i].myTurn) {
        this.players[i].score += event;
        this.players[i].myTurn = false;
        if (i === this.players.length - 1) {
          this.players[0].myTurn = true;
          this.currentPlayer = this.players[0].playerNumber;
        } else {
          this.players[i + 1].myTurn = true;
          this.currentPlayer = this.players[i + 1].playerNumber;
        }
        this.selectedQuestion.value = 0;
        break;
      }
    }
    this.isSelectedQuestion = false;
    this.checkForRoundEnd();
  }

  checkForRoundEnd() {
    this.endRound = true;
    this.questions.forEach(question => {
      if (question.value !== 0) {
        this.endRound = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
