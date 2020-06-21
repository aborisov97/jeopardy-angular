import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalQuestionWindowComponent } from './final-question-window.component';

describe('FinalQuestionWindowComponent', () => {
  let component: FinalQuestionWindowComponent;
  let fixture: ComponentFixture<FinalQuestionWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalQuestionWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalQuestionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
