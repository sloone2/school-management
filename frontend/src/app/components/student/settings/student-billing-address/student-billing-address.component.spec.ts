import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBillingAddressComponent } from './student-billing-address.component';

describe('StudentBillingAddressComponent', () => {
  let component: StudentBillingAddressComponent;
  let fixture: ComponentFixture<StudentBillingAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBillingAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
