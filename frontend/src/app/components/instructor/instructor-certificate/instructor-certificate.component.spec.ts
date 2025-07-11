import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCertificateComponent } from './instructor-certificate.component';

describe('InstructorCertificateComponent', () => {
  let component: InstructorCertificateComponent;
  let fixture: ComponentFixture<InstructorCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
