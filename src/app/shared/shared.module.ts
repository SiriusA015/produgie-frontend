import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedDetailedReportComponent } from 'src/app/shared/components/shared-detailed-report/shared-detailed-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSvgIconComponent } from './mat-svg-icon.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DividerComponent } from './components/divider/divider.component';
import { SliderColorDirective } from './directives/SliderColorDirective';
import { NotificationPanelComponent } from './components/notification-panel/notification-panel.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { ScatterDirectionalGraphComponent } from './components/scatter-directional-graph/scatter-directional-graph.component';
import { HelipopperModule } from '@ngneat/helipopper';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './service/auth.service';
import { SharedCycleReportComponent } from './components/shared-cycle-report/shared-cycle-report.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SharedDonutReportComponent } from './components/shared-donut-report/shared-donut-report.component';
import { SharedAlignmentProfileComponent } from './components/shared-alignment-profile/shared-alignment-profile.component';
import { TeamsNotificationPanelComponent } from './components/teams-notification-panel/teams-notification-panel.component';


@NgModule({
  declarations: [
    MatSvgIconComponent,
    DividerComponent,
    SliderColorDirective,
    SharedDetailedReportComponent,
    NotificationPanelComponent,
    TimepickerComponent,
    ScatterDirectionalGraphComponent,
    SharedHeaderComponent,
    SharedCycleReportComponent,
    SharedDonutReportComponent,
    SharedAlignmentProfileComponent,
    TeamsNotificationPanelComponent,
  ],
  imports: [
    MatRadioModule,
    CommonModule,
    MatIconModule,
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HelipopperModule.forRoot(),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      // "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": true,
      "showSubtitle":false,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
      "lazy": true})
  ],
  providers: [
    MatIconRegistry,
    AuthService
  ],
  exports: [
    MatDialogModule,
    MatSvgIconComponent,
    DividerComponent,
    SliderColorDirective,
    SharedDetailedReportComponent,
    NotificationPanelComponent,
    TimepickerComponent,
    ScatterDirectionalGraphComponent,
    SharedHeaderComponent,
    ReactiveFormsModule,
    MatSelectModule, MatFormFieldModule, MatInputModule,
    SharedCycleReportComponent,
    SharedDonutReportComponent,
    SharedAlignmentProfileComponent
  ]
})
export class SharedModule { }
