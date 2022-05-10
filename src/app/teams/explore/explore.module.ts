import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreRoutingModule } from './explore-routing.module';
import { TeamPortalComponent } from './team-portal/team-portal.component';
import { UiModule } from 'src/app/ui/ui.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPrintModule } from 'ngx-print';
import { MatMenuModule } from '@angular/material/menu';
import { AlignmentSurveyComponent } from './team-portal/alignment-survey/alignment-survey.component';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ExploreNavbarComponent } from './explore-navbar/explore-navbar.component';
import { GrowthLeaderTeamProfileComponent } from './growth-leader-team-profile/growth-leader-team-profile.component';
import { DonutComponent } from './growth-leader-team-profile/donut/donut.component';
import { DonutBoxComponent } from './growth-leader-team-profile/donut-box/donut-box.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { DonutCycleComponent } from './growth-leader-team-profile/donut-cycle/donut-cycle.component';
import { TeamAlignmentProfileComponent } from './team-alignment-profile/team-alignment-profile.component';
import { AlignmentProfileStructureComponent } from './team-alignment-profile/alignment-profile-structure/alignment-profile-structure.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExploreService } from '../explore/explore.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DetailReportGlaComponent } from './growth-leader-team-profile/detail-report-gla/detail-report-gla.component';
import { DetailReportGlaHeadingComponent } from './growth-leader-team-profile/detail-report-gla/detail-report-gla-heading/detail-report-gla-heading.component';
import { DetailedReportGlaComponent } from './growth-leader-team-profile/detail-report-gla/detailed-report-gla/detailed-report-gla.component';
import { DetailedReportGlaFooterComponent } from './growth-leader-team-profile/detail-report-gla/detailed-report-gla-footer/detailed-report-gla-footer.component';
import { DetailReportTeamProfileComponent } from './team-alignment-profile/detail-report-team-profile/detail-report-team-profile.component';
import { DetailReportTeamProfileHeadingComponent } from './team-alignment-profile/detail-report-team-profile/detail-report-team-profile-heading/detail-report-team-profile-heading.component';
import { DetailReportTeamProfileFooterComponent } from './team-alignment-profile/detail-report-team-profile/detail-report-team-profile-footer/detail-report-team-profile-footer.component';
import { DetailedReportTeamprofileComponent } from './team-alignment-profile/detail-report-team-profile/detailed-report-teamprofile/detailed-report-teamprofile.component';
import { DetailReportCycleComponent } from './growth-leader-team-profile/detail-report-cycle/detail-report-cycle.component';
import { DetailReportCycleHeadingComponent } from './growth-leader-team-profile/detail-report-cycle/detail-report-cycle-heading/detail-report-cycle-heading.component';
import { DetailReportCycleFooterComponent } from './growth-leader-team-profile/detail-report-cycle/detail-report-cycle-footer/detail-report-cycle-footer.component';
import { DetailedReportCycleComponent } from './growth-leader-team-profile/detail-report-cycle/detailed-report-cycle/detailed-report-cycle.component';

@NgModule({
  declarations: [
    ExploreNavbarComponent,
    TeamPortalComponent,
    AlignmentSurveyComponent,
    GrowthLeaderTeamProfileComponent,
    DonutComponent,
    DonutBoxComponent,
    DonutCycleComponent,
    TeamAlignmentProfileComponent,
    AlignmentProfileStructureComponent,
    DetailReportGlaComponent,
    DetailReportGlaHeadingComponent,
    DetailedReportGlaComponent,
    DetailedReportGlaFooterComponent,
    DetailReportTeamProfileComponent,
    DetailReportTeamProfileHeadingComponent,
    DetailReportTeamProfileFooterComponent,
    DetailedReportTeamprofileComponent,
    DetailReportCycleComponent,
    DetailReportCycleHeadingComponent,
    DetailReportCycleFooterComponent,
    DetailedReportCycleComponent,],

  imports: [
    CommonModule,
    ExploreRoutingModule,
    UiModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatRadioModule,
    MatGridListModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    NgxPrintModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    SharedModule,
    MatTooltipModule,
    MatIconModule,
    MatBadgeModule,
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
    })
  ],
  providers: [{
    provide: ToastrService
  },
    ExploreService,
  ],
  exports: [
    AlignmentSurveyComponent
  ]
})
export class ExploreModule { }
