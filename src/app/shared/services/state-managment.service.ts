import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateManagmentService {
  playerCount = new ReplaySubject<number>();
  questionsCategory = new ReplaySubject<string>();
  startGame = new ReplaySubject<{playerCount: number, questionsCategory: string}>(1);

  constructor() { }
}
