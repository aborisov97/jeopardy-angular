import { Component, OnInit, OnDestroy } from '@angular/core';
import { StateManagmentService } from '../shared/services/state-managment.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  startedGame = false;
  fillAllFields = false;
  playerCount: number;
  questionsCategory: string;
  destroyed$ = new Subject<boolean>();

  constructor(
    public stateManagmentService: StateManagmentService
  ) { }

  ngOnInit() {
    this.stateManagmentService.playerCount.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      if (res) {
        this.playerCount = res;
      }
    });
    this.stateManagmentService.questionsCategory.pipe(takeUntil(this.destroyed$)).subscribe(res => {
      if (res) {
        this.questionsCategory = res;
      }
    });
  }

  startGame() {
    console.log('Home Component checking subscription -> playerCount', this.playerCount);
    console.log('Home Component checking subscription -> questionsCategory', this.questionsCategory);
    if (this.playerCount && this.questionsCategory) {
      console.log('Home Component checking start game functionality -> READY!');
      this.stateManagmentService.startGame.next({playerCount: this.playerCount, questionsCategory: this.questionsCategory});
      this.startedGame = true;
      this.fillAllFields = false;
    } else {
      this.fillAllFields = true;
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
