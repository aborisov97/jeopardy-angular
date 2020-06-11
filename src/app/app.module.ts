import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PlayerSelectionComponent } from './home/player-selection/player-selection.component';
import { QuestionSelectionComponent } from './home/question-selection/question-selection.component';
import { JeopardyComponent } from './home/jeopardy/jeopardy.component';
import { QuestionWindowComponent } from './home/jeopardy/question-window/question-window.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    PlayerSelectionComponent,
    QuestionSelectionComponent,
    JeopardyComponent,
    QuestionWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }