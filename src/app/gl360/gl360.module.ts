import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { Ng5SliderModule } from 'ng5-slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from './../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlNomineeComponent } from './components/gl-nominee/gl-nominee.component';
import { RouterModule } from '@angular/router';
import { gl360routes } from './gl360.routing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { HelipopperModule } from '@ngneat/helipopper';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';
import { GrowthLeaderCircleComponent } from './components/growth-leader-circle/growth-leader-circle.component';
import { GrowthLeaderReportComponent } from './components/growth-leader-report/growth-leader-report.component';
import { BenchmarkModalComponent } from './modals/benchmark-modal/benchmark-modal.component';
import { ChartsModule } from 'ng2-charts';
import { FullReportComponent } from './modals/full-report/full-report.component';
import { GlReportComponent } from './modals/full-report/gl-report/gl-report.component';
import { ReportHeadingGl360Component } from './modals/report-heading-gl360/report-heading-gl360.component';
import { ReportFooterGl360Component } from './modals/report-footer-gl360/report-footer-gl360.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxPrintModule } from 'ngx-print';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [
    GlNomineeComponent,
    GrowthLeaderCircleComponent,
    GrowthLeaderReportComponent,
    BenchmarkModalComponent,
    FullReportComponent,
    GlReportComponent,
    ReportHeadingGl360Component,
    ReportFooterGl360Component,
  ],
  exports: [GrowthLeaderReportComponent, GrowthLeaderCircleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(gl360routes),
    MatIconModule,
    SharedModule,
    DragDropModule,
    MatDialogModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    OverlayModule,
    Ng5SliderModule,
    NgxPrintModule,
    MatCardModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgxMaterialTimepickerModule,
    NguCarouselModule,
    CustomFormsModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
    HelipopperModule.forRoot(),
    MatBadgeModule,
    ChartsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatAutocompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class Gl360Module {}
