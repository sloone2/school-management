import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorStatementsComponent } from './instructor-statements.component';

describe('InstructorStatementsComponent', () => {
  let component: InstructorStatementsComponent;
  let fixture: ComponentFixture<InstructorStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorStatementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
