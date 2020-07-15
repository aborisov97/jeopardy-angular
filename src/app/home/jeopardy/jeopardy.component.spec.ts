import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { JeopardyComponent } from './jeopardy.component';
import { NO_ERRORS_SCHEMA, ComponentRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StateManagmentService } from 'src/app/shared/services/state-managment.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('JeopardyComponent', () => {
  let component: JeopardyComponent;
  let fixture: ComponentFixture<JeopardyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ JeopardyComponent ],
      imports: [HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebase)],
      providers: [AngularFirestore, StateManagmentService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeopardyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do on init', () => {
    const stateManagment = fixture.debugElement.injector.get(StateManagmentService);
    spyOn(component, 'initPlayers');
    spyOn(component, 'loadRoundOneQuestions');


    stateManagment.startGame.next(undefined);

    component.ngOnInit();

    expect(component.initPlayers).not.toHaveBeenCalled();

    stateManagment.startGame.next( {
      questionsCategory: 'Test',
      playerCount: 3
    });

    component.ngOnInit();

    expect(component.initPlayers).toHaveBeenCalled();
    expect(component.loadRoundOneQuestions).toHaveBeenCalled();
  });

  it('should init Players', () => {
    component.playerNumber = 3;
    component.players = [];
    component.currentPlayer = undefined;

    component.initPlayers();

    expect(component.players.length).toEqual(3);
    expect(component.currentPlayer).toEqual('Spieler 1');
  });

  it('should show Question Window', () => {
    component.selectedQuestion = 'test';
    component.isSelectedQuestion = false;

    component.showQuestionWindow('Test1');

    expect(component.selectedQuestion).toEqual('Test1');
    expect(component.isSelectedQuestion).toBeTruthy();
  });

  it('should calculate points', () => {
    component.selectedQuestion = {answer: 'test'};
    component.isSelectedQuestion = true;
    component.currentPlayer = 'test2';
    component.players = [
      {
        myTurn: false, score: 0, playerNumber: 'test1'
      },
      {
        myTurn: true, score: 0, playerNumber: 'test2'
      },
      {
        myTurn: false, score: 0, playerNumber: 'test3'
      }
    ];
    spyOn(component, 'checkForRoundEnd');

    component.calculatePoints(200);

    expect(component.selectedQuestion.answer).toEqual('answered');
    expect(component.isSelectedQuestion).not.toBeTruthy();
    expect(component.checkForRoundEnd).toHaveBeenCalled();


    component.players = [
      {
        myTurn: false, score: 0, playerNumber: 'test1'
      },
      {
        myTurn: true, score: 0, playerNumber: 'test2'
      }
    ];

    component.calculatePoints(200);


    expect(component.selectedQuestion.answer).toEqual('answered');
    expect(component.isSelectedQuestion).not.toBeTruthy();
    expect(component.checkForRoundEnd).toHaveBeenCalled();
  });

  it('should endgame', () => {
    component.endRound = true;
    component.endGame = true;
    component.winner = undefined;
    component.players = [
      {
        myTurn: false, score: 400, playerNumber: 'test1'
      },
      {
        myTurn: true, score: 600, playerNumber: 'test2'
      }
    ];
    component.questions = [{value: 400}];

    let lastRoundAnswers = [
      {correct: true, wager: 400},
      {correct: false, wager: 200}
    ];
    component.ENDGAME(lastRoundAnswers);

    expect(component.winner).toEqual(1);
    expect(component.endGame).toBeTruthy();
    expect(component.endRound).toBeTruthy();


    lastRoundAnswers = [
      {correct: false, wager: 20},
      {correct: true, wager: 400}
    ];
    component.ENDGAME(lastRoundAnswers);

    expect(component.winner).toEqual(2);
    expect(component.endGame).toBeTruthy();
    expect(component.endRound).toBeTruthy();
  });

});
