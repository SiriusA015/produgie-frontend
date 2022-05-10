import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestMemberRoutingModule } from './guest-member-routing.module';
import { AlignSurveyComponent } from './align-survey/align-survey.component';
import { SharedModule } from '../shared/shared.module';
import { ExploreModule } from '../teams/explore/explore.module';
import { TeamsModule } from '../teams/teams.module';
import { MatRadioModule } from '@angular/material/radio';
import { UiModule } from '../ui/ui.module';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxPrintModule } from 'ngx-print';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JoinTeamComponent } from './join-team/join-team.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { GuestTeamDashboardComponent } from './guest-team-dashboard/guest-team-dashboard.component';
import { GuestDevelopmentPlanComponent } from './guest-development-plan/guest-development-plan.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DesignTeamModule } from '../teams/design-team/design-team.module';
import { NguCarouselModule } from '@ngu/carousel';
import { DashPipePipe } from './dash-pipe.pipe';

@NgModule({
  declarations: [
    AlignSurveyComponent,
    JoinTeamComponent,
    GuestTeamDashboardComponent,
    GuestDevelopmentPlanComponent,
    DashPipePipe],
  imports: [
    CommonModule,
    GuestMemberRoutingModule,
    SharedModule,
    TeamsModule,
    ExploreModule,
    UiModule,
    FormsModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    MatTooltipModule,
    MatRadioModule,
    MatGridListModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    NgxPrintModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    ToastrModule,
    ToastrModule.forRoot(),
    SharedModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": true,
      "showSubtitle": false,
      "showBackground": false,
      "clockwise": true,
      "startFromZero": false,
    }),
    DesignTeamModule,
    NguCarouselModule,
  ],
  providers: [
    {
      provide: ToastrService
    },
  ]
})
export class GuestMemberModule { }
