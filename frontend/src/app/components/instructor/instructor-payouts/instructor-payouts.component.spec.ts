import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPayoutsComponent } from './instructor-payouts.component';

describe('InstructorPayoutsComponent', () => {
  let component: InstructorPayoutsComponent;
  let fixture: ComponentFixture<InstructorPayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorPayoutsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
