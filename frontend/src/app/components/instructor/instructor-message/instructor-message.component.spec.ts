import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorMessageComponent } from './instructor-message.component';

describe('InstructorMessageComponent', () => {
  let component: InstructorMessageComponent;
  let fixture: ComponentFixture<InstructorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
