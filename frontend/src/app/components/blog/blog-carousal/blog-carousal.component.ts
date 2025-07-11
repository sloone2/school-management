import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-blog-carousal',
  standalone: false,
  templateUrl: './blog-carousal.component.html',
  styleUrl: './blog-carousal.component.scss'
})
export class BlogCarousalComponent {
public routes = routes;
public topCategoriesOwlOptions = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  rtl:true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
      slidesToShow: 1,
      slidesToScroll: 1
      }
    }
    ]
};
}
