import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent implements OnInit {
  players: number;
  showError = false;
  constructor() { }

  ngOnInit() {
  }

  submitPlayers() {
    if (!this.players || this.players < 1) {
      this.showError = true;
    } else {
      this.showError = false;
    }
    console.log(this.players);
  }

}
