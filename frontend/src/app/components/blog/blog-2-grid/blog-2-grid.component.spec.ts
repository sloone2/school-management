import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog2GridComponent } from './blog-2-grid.component';

describe('Blog2GridComponent', () => {
  let component: Blog2GridComponent;
  let fixture: ComponentFixture<Blog2GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Blog2GridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog2GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
