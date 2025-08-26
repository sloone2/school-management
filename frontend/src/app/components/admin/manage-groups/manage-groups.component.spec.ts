import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorManageGroupsComponent } from './manage-groups.component';

describe('InstructorAnnouncementsComponent', () => {
  let component: InstructorManageGroupsComponent;
  let fixture: ComponentFixture<InstructorManageGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorManageGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorManageGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
