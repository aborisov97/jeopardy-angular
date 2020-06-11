import { TestBed } from '@angular/core/testing';

import { StateManagmentService } from './state-managment.service';

describe('StateManagmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateManagmentService = TestBed.get(StateManagmentService);
    expect(service).toBeTruthy();
  });
});
