import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytasksComponent } from './mytasks.component';

describe('MytasksComponent', () => {
  let component: MytasksComponent;
  let fixture: ComponentFixture<MytasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MytasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MytasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
