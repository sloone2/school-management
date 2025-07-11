import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
    selector: 'app-student-wishlist',
    templateUrl: './student-wishlist.component.html',
    styleUrl: './student-wishlist.component.scss',
    standalone: false
})
export class StudentWishlistComponent {
  public routes = routes;
  isSelected: boolean[] = Array(10).fill(true);

  iconSelect(index: number): void {
    this.isSelected[index] = !this.isSelected[index]; // Toggle boolean value
  }
}
