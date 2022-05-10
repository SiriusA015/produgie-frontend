import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintTeamRoutingModule } from './sprint-team-routing.module';
import { TeamSprintDashboardComponent } from './components/team-sprint-dashboard/team-sprint-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamRoadmapComponent } from './components/team-roadmap/team-roadmap.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TeamsTokenInterceptor } from '../services/teams-interceptors/teams-token.interceptor';
import { TeamBottomNavComponent } from './components/team-bottom-nav/team-bottom-nav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { TeamTrendsComponent } from './components/team-trends/team-trends.component';
import { TeamEffortComponent } from './components/team-effort/team-effort.component';
import { HelipopperModule } from '@ngneat/helipopper';
import { CalenderComponent } from './components/calender/calender.component';
import { TeamViewEventComponent } from './components/team-view-event/team-view-event.component';
import { TeamAddEventComponent } from './components/team-add-event/team-add-event.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TeamEventDataComponent } from './components/team-event-data/team-event-data.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TeamRoadmapCommentComponent } from './team-roadmap-comment/team-roadmap-comment.component';
import {MatMenuModule} from '@angular/material/menu';
import { RoadmapViewEventComponent } from './roadmap-view-event/roadmap-view-event.component';
import { RoadmapViewComponent } from './roadmap-view/roadmap-view.component';
import { TeamAddStakeholderComponent } from './team-add-stakeholder/team-add-stakeholder.component';
import { TeamGraphDialogComponent } from './components/team-graph-dialog/team-graph-dialog.component';
import { SprintServiceService } from './sprint-service.service';

@NgModule({
  declarations: [TeamSprintDashboardComponent, TeamRoadmapComponent, TeamBottomNavComponent, TeamTrendsComponent, TeamEffortComponent, CalenderComponent, TeamViewEventComponent, TeamAddEventComponent, TeamEventDataComponent, TeamRoadmapCommentComponent, RoadmapViewEventComponent, RoadmapViewComponent, TeamAddStakeholderComponent, TeamGraphDialogComponent],
  imports: [
    CommonModule,
    SprintTeamRoutingModule,
    MatIconModule,
    SharedModule,
    MatTabsModule,
    ChartsModule,
    HelipopperModule.forRoot(),
    MatExpansionModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMenuModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    SprintServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TeamsTokenInterceptor,
      multi: true,
    }
  ],
})
export class SprintTeamModule { }
