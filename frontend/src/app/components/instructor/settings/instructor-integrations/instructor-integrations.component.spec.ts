import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorIntegrationsComponent } from './instructor-integrations.component';

describe('InstructorIntegrationsComponent', () => {
  let component: InstructorIntegrationsComponent;
  let fixture: ComponentFixture<InstructorIntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorIntegrationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
