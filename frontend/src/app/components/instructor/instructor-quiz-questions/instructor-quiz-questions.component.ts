import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-quiz-questions',
  standalone: false,
  templateUrl: './instructor-quiz-questions.component.html',
  styleUrl: './instructor-quiz-questions.component.scss'
})
export class InstructorQuizQuestionsComponent {
routes=routes
formData: any[] = []; // Initialize with an empty object to start with one row

addNewRow() {
  this.formData.push({});
}

removeRow(index: number) {
    this.formData.splice(index, 1);
}

}
