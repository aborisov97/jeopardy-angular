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
  round: 1 | 2 | 3;
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
    // to do - add round logic
    this.round = 1;
    this.loadRoundOneQuestions();
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

  loadRoundOneQuestions() {
    // to do - add real BE call with real data
    this.getJSON().subscribe(data => {
      console.log(data);
      this.questions = data;
      this.checkForRoundEnd();
    });
  }

  public getJSON(): Observable<any> {
   return this.http.get(this.jsonURL);
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

  nextRound() {
    if (this.round !== 3) {
      this.round++;
    }
    if (this.round === 2) {
      // this.loadRoundTwoQuestions();
      this.jsonURL = '../assets/data/questions_test2.json';
      this.loadRoundOneQuestions();
    } else {
      // to do - add logic for round 2 and 3 quesitons
      // this.loadRoundThreeQuestions();
      this.jsonURL = '../assets/data/questions_test3.json';
      this.loadRoundOneQuestions();
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
