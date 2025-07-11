import { Component } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})
export class AddCourseComponent {
  routes=routes;
  public selectedFieldSet = [0];
  tags = ['Red', 'Black'];
  editor!: Editor;
  editor1!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic', 'format_clear'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['image'],
    ['link'],
  ];
  formData: any[] = []; // Initialize with an empty object to start with one row

  addNewRow() {
    this.formData.push({});
  }

  removeRow(index: number) {
      this.formData.splice(index, 1);
  }
  trackByIndex(index: number, item: any) {
    return index;
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.editor1 = new Editor();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor1.destroy();
  }
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
}
