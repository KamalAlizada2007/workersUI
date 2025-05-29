import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktaskComponent } from './worktask.component';

describe('WorktaskComponent', () => {
  let component: WorktaskComponent;
  let fixture: ComponentFixture<WorktaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorktaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorktaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
