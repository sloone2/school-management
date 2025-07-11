import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSocialProfilesComponent } from './instructor-social-profiles.component';

describe('InstructorSocialProfilesComponent', () => {
  let component: InstructorSocialProfilesComponent;
  let fixture: ComponentFixture<InstructorSocialProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorSocialProfilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorSocialProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
