import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeopardyComponent } from './jeopardy.component';

describe('JeopardyComponent', () => {
  let component: JeopardyComponent;
  let fixture: ComponentFixture<JeopardyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeopardyComponent ]
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
});
