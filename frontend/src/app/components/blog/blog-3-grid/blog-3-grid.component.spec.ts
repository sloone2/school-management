import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blog3GridComponent } from './blog-3-grid.component';

describe('Blog3GridComponent', () => {
  let component: Blog3GridComponent;
  let fixture: ComponentFixture<Blog3GridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Blog3GridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Blog3GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
