import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import { StateManagmentService } from 'src/app/shared/services/state-managment.service';
import { takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-jeopardy',
  templateUrl: './jeopardy.component.html',
  styleUrls: ['./jeopardy.component.scss']
})
export class JeopardyComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  isSelectedQuestion = false;
  endRound = false;
  endGame = false;
  round: 1 | 2 | 3;
  selectedQuestion: any;
  questions = [];
  // for rendering the tables
  rows = [3, 7, 11, 15];
  players = [];
  playerNumber: number;
  questionsCategory: string;
  currentPlayer: string;
  private jsonURLFIREBASE = '../assets/data/my_questions.json';
  winner: number;

  constructor(
    private http: HttpClient,
    public stateManagmentService: StateManagmentService,
    private fire: AngularFirestore
  ) {
    // for testing
    // this.round = 3;
    this.round = 1;
  }

  ngOnInit() {
    this.stateManagmentService.startGame.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      if (res) {
        this.playerNumber = res.playerCount;
        this.questionsCategory = res.questionsCategory;
        this.loadRoundOneQuestions();
        this.initPlayers();
        // for testing
        // this.nextRound();
      }
    });
  }

  loadRoundOneQuestions() {
    this.fire.
        collection('/questions', ref => ref
        .where('category', '==', this.questionsCategory).where('round', '==', 'Jeopardy!'))
        .valueChanges().subscribe(res2 => {
          console.log(res2);
          this.questions = res2;
          this.checkForRoundEnd();
    });
  }

  loadRoundTwoQuestions() {
    this.fire.
        collection('/questions', ref => ref
        .where('category', '==', this.questionsCategory).where('round', '==', 'Double Jeopardy!'))
        .valueChanges().subscribe(res2 => {
          console.log(res2);
          this.questions = res2;
          this.checkForRoundEnd();
    });
  }

  loadFinalJeopardy() {
    this.fire.
        collection('/questions', ref => ref
        .where('category', '==', this.questionsCategory).where('round', '==', 'Final Jeopardy!'))
        .valueChanges().subscribe(res2 => {
          console.log(res2);
          this.questions = res2;
          this.checkForRoundEnd();
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
        this.selectedQuestion.answer = 'answered';
        break;
      }
    }
    this.isSelectedQuestion = false;
    this.checkForRoundEnd();
  }

  ENDGAME(event) {
    for (let i = 0 ; i < this.players.length ; i++) {
      if (event[i].correct) {
        this.players[i].score += this.questions[0].value + event[i].wager;
      } else {
        this.players[i].score -= event[i].wager;

      }
    }
    let maxScore = this.players[0].score;
    this.winner = 1;
    for (let i = 0 ; i < this.players.length ; i++) {
      if (this.players[i].score > maxScore) {
        maxScore = this.players[i].score;
        this.winner = i + 1;
      }
    }
    this.endRound = true;
    this.endGame = true;
  }

  checkForRoundEnd() {
    this.endRound = true;
    this.questions.forEach(question => {
      if (question.answer !== 'answered') {
        this.endRound = false;
      }
    });
  }

  nextRound() {
    if (this.round !== 3) {
      this.round++;
    }
    if (this.round === 2) {
      this.loadRoundTwoQuestions();
    } else {
      // to do - add final jeopardy window component
      this.loadFinalJeopardy();
    }
  }

  uploadQuestionsInFireBase() {
    let id = 100;
    this.getJSONFIREBASE().subscribe(data => {
      data.forEach(question => {
        this.fire.collection('/questions').doc(question.id).set(question).then(res2 => {
          console.log('FIREBASEUploas -> ', res2);
          id++;
        });
      });
    });
  }

  public getJSONFIREBASE(): Observable<any> {
   return this.http.get(this.jsonURLFIREBASE);
  }

  refresh(): void {
    window.location.reload();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
