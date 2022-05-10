import { NguCarouselModule } from '@ngu/carousel';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashMainComponent } from './components/dash-main/dash-main.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { KeyComponent } from './components/dash-main/key/key.component';
import { OtherComponent } from './components/other/other.component';
import { ResilienceComponent } from './components/dash-main/resilience/resilience.component';
import { UpdatedDashboardComponent } from './components/updated-dashboard/updated-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnapshotComponent } from './components/dash-main/snapshot/snapshot.component';
import { ContactCardComponent } from './components/dash-main/contact-card/contact-card.component';
import { SummaryComponent } from './components/dash-main/summary/summary.component';
import { SummaryDetailsComponent } from './components/dash-main/summary-details/summary-details.component';
import { MatBadgeModule } from '@angular/material/badge';
import { OverlayModule } from '@angular/cdk/overlay';
import { SprintRolesComponent } from './components/dash-main/sprint-roles/sprint-roles.component';
import { MyDevPlanComponent } from './components/my-dev-plan/my-dev-plan.component';
import { MyAdviceComponent } from './components/my-dev-plan/modals/my-advice/my-advice.component';
import { MyCommentsComponent } from './components/my-dev-plan/modals/my-comments/my-comments.component';
import { MDFadOverviewComponent } from './components/my-dev-plan/fad-overview/fad-overview.component';
import { MDSprintOverviewComponent } from './components/my-dev-plan/sprint-overview/sprint-overview.component';
import { MDSprintDurationOverviewComponent } from './components/my-dev-plan/sprint-duration-overview/sprint-duration-overview.component';
import { MDAboOverviewComponent } from './components/my-dev-plan/abo-overview/abo-overview.component';
import { MDSprintCrewOverviewComponent } from './components/my-dev-plan/sprint-crew-overview/sprint-crew-overview.component';
import { SharedModule } from '../shared/shared.module';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';
import { CongratsComponent } from './components/congrats/congrats.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { DashLeftNavComponent } from './layouts/dash-left-nav/dash-left-nav.component';
import { DashViewingRightsComponent } from './components/user-dashboard/dash-viewing-rights/dash-viewing-rights.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MyPortfolioComponent } from './components/my-portfolio/my-portfolio.component';
import { SprintSelectionDetailsComponent } from './components/my-portfolio/sprint-selection-details/sprint-selection-details.component';

import { IgxCalendarModule } from "igniteui-angular";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleModule, ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { ModalDialogComponent } from './components/user-dashboard/modal-dialog/modal-dialog.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxSpinnerModule } from "ngx-spinner";
import { HelipopperModule } from '@ngneat/helipopper';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { SprintCongratulationDialogComponent } from './components/modal/sprint-congratulation-dialog/sprint-congratulation-dialog.component';
@NgModule({
  declarations: [
    DashMainComponent,
    KeyComponent,
    OtherComponent,
    ResilienceComponent,
    UpdatedDashboardComponent,
    SnapshotComponent,
    ContactCardComponent,
    SummaryComponent,
    SummaryDetailsComponent,
    SprintRolesComponent,
    MyDevPlanComponent,
    MyAdviceComponent,
    MyCommentsComponent,
    MDFadOverviewComponent,
    MDSprintOverviewComponent,
    MDSprintDurationOverviewComponent,
    MDAboOverviewComponent,
    MDSprintCrewOverviewComponent,
    CongratsComponent,
    UserDashboardComponent,
    DashLeftNavComponent,
    DashViewingRightsComponent,
    MyPortfolioComponent,
    SprintSelectionDetailsComponent,
    ModalDialogComponent,
    SprintCongratulationDialogComponent
   
  ],
  imports: [
    CommonModule,
    // SprintModule,
    ScheduleModule,
    IgxCalendarModule,
    ScheduleAllModule,
    MatTabsModule,
    RouterModule.forChild(dashboardRoutes),
    MatIconModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    OverlayModule,
    SharedModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    NguCarouselModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxQRCodeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    HelipopperModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
