import { NgModule } from '@angular/core';
import { FeatherIconModule } from './feather.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountUpModule } from "ngx-countup";
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgApexchartsModule } from 'ng-apexcharts';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BsDatepickerConfig, BsDatepickerModule, BsDaterangepickerConfig } from 'ngx-bootstrap/datepicker';
import { EditorModule } from 'primeng/editor';
import { InstructorSidebarModule } from 'src/app/components/instructor/common/instructor-sidebar/instructor-sidebar.module';
import { StudentSidebarModule } from 'src/app/components/student/common/student-sidebar/student-sidebar.module';
import { DatePipe } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';
import { LightboxModule } from 'ngx-lightbox';
import { CapitalizeWordsPipe } from '../pipe/capitalize-words.pipe';
import { NgxEditorModule } from 'ngx-editor';
import { DateRangePickerModule } from 'src/app/layouts/date-range-picker/date-range-picker.module';
import { DatePicker } from 'primeng/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({ 
    declarations:[CapitalizeWordsPipe],
    exports: [
        FeatherIconModule,
        NgCircleProgressModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        CountUpModule,
        SlickCarouselModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatNativeDateModule,
        MatTooltipModule,
        MatToolbarModule,
        MatSliderModule,
        DatePicker,
        DatePickerModule,
        MatNativeDateModule, 
        DateRangePickerModule, 
        MatCardModule,
        MatSortModule,
        MatTableModule,
        MatStepperModule,
        LightgalleryModule,
        NgxEditorModule,
        LightboxModule,
        MatIconModule,
        TooltipModule,
        CarouselModule,
        NgScrollbarModule,
        InstructorSidebarModule,
        StudentSidebarModule,
        EditorModule,
        CalendarModule,
        BsDatepickerModule,
        CapitalizeWordsPipe
    ], 
    
    imports: [FeatherIconModule,
        FormsModule,
        NgCircleProgressModule.forRoot({
            "radius": 50,
            "space": -10,
            "outerStrokeWidth": 10,
            "innerStrokeWidth": 10,
            "animationDuration": 1000,
            "clockwise": false,
            "startFromZero": false,
            "lazy": false,
            "outerStrokeLinecap": "square",
            "showSubtitle": false,
            "showTitle": false,
            "showUnits": false,
            "showBackground": false
        }),
        MatSelectModule,
        MatFormFieldModule,
        CountUpModule,
        SlickCarouselModule,
        NgApexchartsModule,
        DatePicker,
        ReactiveFormsModule,
        MatInputModule,
        MatTooltipModule,
        CalendarModule,
        MatNativeDateModule,
        MatToolbarModule,
        DatePickerModule,
        MatSliderModule,
        DateRangePickerModule,
        MatNativeDateModule,
        LightgalleryModule,
        NgxEditorModule,
        LightboxModule,
        // MatDatepickerModule,
        MatCardModule,
        MatSortModule,
        MatTableModule,
        MatStepperModule,
        MatIconModule,
        TooltipModule,
        CarouselModule,
        NgScrollbarModule,
        InstructorSidebarModule,
        StudentSidebarModule,
        EditorModule,
        BsDatepickerModule,
        
    ],
        
    providers: [BsDatepickerConfig, DatePipe, BsDaterangepickerConfig, provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule {}
