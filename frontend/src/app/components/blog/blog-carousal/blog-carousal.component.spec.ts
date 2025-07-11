import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCarousalComponent } from './blog-carousal.component';

describe('BlogCarousalComponent', () => {
  let component: BlogCarousalComponent;
  let fixture: ComponentFixture<BlogCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogCarousalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
