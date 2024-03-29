import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PlayerSelectionComponent } from './home/player-selection/player-selection.component';
import { QuestionSelectionComponent } from './home/question-selection/question-selection.component';
import { JeopardyComponent } from './home/jeopardy/jeopardy.component';
import { QuestionWindowComponent } from './home/jeopardy/question-window/question-window.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CountdownModule } from 'ngx-countdown';
import { QuestionCellComponent } from './home/jeopardy/question-cell/question-cell.component';
import { environment } from 'src/environments/environment';
import { FinalQuestionWindowComponent } from './home/jeopardy/final-question-window/final-question-window.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    PlayerSelectionComponent,
    QuestionSelectionComponent,
    JeopardyComponent,
    QuestionWindowComponent,
    QuestionCellComponent,
    FinalQuestionWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CountdownModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
