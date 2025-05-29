import { TestBed } from '@angular/core/testing';

import { WorkTaskService } from './work-task.service';

describe('WorkTaskService', () => {
  let service: WorkTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
