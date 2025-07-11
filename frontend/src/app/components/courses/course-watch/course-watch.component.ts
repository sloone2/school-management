import { Component, OnInit } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { routes } from 'src/app/shared/service/routes/routes';
import Aos from 'aos';

@Component({
  selector: 'app-course-watch',
  standalone: false,
  templateUrl: './course-watch.component.html',
  styleUrl: './course-watch.component.scss'
})
export class CourseWatchComponent {
 routes=routes;
settings = {
    counter: false,
    plugins: [lgZoom, lgVideo],
  };
  private lightGallery!: LightGallery;
  private needRefresh = false;
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;

  };
   ngOnInit() {
      Aos.init({ duration: 1200, once: true });
    }
}
