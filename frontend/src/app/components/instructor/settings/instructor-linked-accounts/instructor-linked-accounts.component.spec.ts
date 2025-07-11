import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLinkedAccountsComponent } from './instructor-linked-accounts.component';

describe('InstructorLinkedAccountsComponent', () => {
  let component: InstructorLinkedAccountsComponent;
  let fixture: ComponentFixture<InstructorLinkedAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorLinkedAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorLinkedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
