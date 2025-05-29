import { TestBed } from '@angular/core/testing';

import { WorktaskService } from './worktask.service';

describe('WorktaskService', () => {
  let service: WorktaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorktaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
