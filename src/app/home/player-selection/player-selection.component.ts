import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import { StateManagmentService } from 'src/app/shared/services/state-managment.service';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent implements OnInit {
  players: number;
  showError = false;
  constructor(
    public stateManagmentService: StateManagmentService
  ) { }

  ngOnInit() {
  }

  submitPlayers() {
    if (!this.players || this.players < 1) {
      this.showError = true;
    } else {
      this.showError = false;
      this.stateManagmentService.playerCount.next(this.players);
    }
  }

}
