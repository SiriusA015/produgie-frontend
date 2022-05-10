import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HelipopperModule } from '@ngneat/helipopper';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
import { NgScatterDirectionalChartModule } from 'ng-scatter-directional-chart';
import { ChartsModule } from 'ng2-charts';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { SprintOnMobileDialogComponent } from 'src/app/ui/layout/modals/sprint-on-mobile-dialog/sprint-on-mobile-dialog.component';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';
import { SharedModule } from '../shared/shared.module';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddStakeholderComponent } from './components/add-stakeholder/add-stakeholder.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { EditEventDataComponent } from './components/edit-event-data/edit-event-data.component';
import { EffortComponent } from './components/effort/effort.component';
import { EventCalenderComponent } from './components/event-calender/event-calender.component';
import { FeedForwardComponent } from './components/feed-forward/feed-forward.component';
import { FfContactCardGroupComponent } from './components/feed-forward/ff-contact-card-group/ff-contact-card-group.component';
import { FfContactCardComponent } from './components/feed-forward/ff-contact-card/ff-contact-card.component';
import { FfHeadingComponent } from './components/feed-forward/ff-heading/ff-heading.component';
import { FfSearchComponent } from './components/feed-forward/ff-search/ff-search.component';
import { FfSupportCrewComponent } from './components/feed-forward/ff-support-crew/ff-support-crew.component';
import { AddEventBottomDialogComponent } from './components/modals/add-event-bottom-dialog/add-event-bottom-dialog.component';
import { AddEventCalendarDialogComponent } from './components/modals/add-event-calendar-dialog/add-event-calendar-dialog.component';
import { AddEventDialogComponent } from './components/modals/add-event-dialog/add-event-dialog.component';
import { AddStakeholderDialogComponent } from './components/modals/add-stakeholder-dialog/add-stakeholder-dialog.component';
import { EditEventCalendarDialogComponent } from './components/modals/edit-event-calendar-dialog/edit-event-calendar-dialog.component';
import { EditEventDialogComponent } from './components/modals/edit-event-dialog/edit-event-dialog.component';
import { EventDeleteDialogComponent } from './components/modals/event-delete-dialog/event-delete-dialog.component';
import { SelectActionDialogComponent } from './components/modals/select-action-dialog/select-action-dialog.component';
import { SelectActivityDialogComponent } from './components/modals/select-activity-dialog/select-activity-dialog.component';
import { SelectCrewDialogComponent } from './components/modals/select-crew-dialog/select-crew-dialog.component';
import { SelectStakeholderDialogComponent } from './components/modals/select-stakeholder-dialog/select-stakeholder-dialog.component';
import { SprintReviewEventDialogComponent } from './components/modals/sprint-review-event-dialog/sprint-review-event-dialog.component';
import { TeamsReviewModalComponent } from './components/modals/teams-review-modal/teams-review-modal.component';
import { ViewEventCalendarDialogComponent } from './components/modals/view-event-calendar-dialog/view-event-calendar-dialog.component';
import { ViewEventDialogComponent } from './components/modals/view-event-dialog/view-event-dialog.component';
import { WcNotificationDialogComponent } from './components/modals/wc-notification-dialog/wc-notification-dialog.component';
import { WcReviewDialogComponent } from './components/modals/wc-review-dialog/wc-review-dialog.component';
import { NotStartedSprintComponent } from './components/not-started-sprint/not-started-sprint.component';
import { ExtendDialogComponent } from './components/roadmap/modals/extend-dialog/extend-dialog.component';
import { RmCalendarComponent } from './components/roadmap/rm-content/rm-calendar/rm-calendar.component';
import { RmCardPerformanceComponent } from './components/roadmap/rm-content/rm-card-performance/rm-card-performance.component';
import { RmCardRoadmapComponent } from './components/roadmap/rm-content/rm-card-roadmap/rm-card-roadmap.component';
import { RmCardSnapshotComponent } from './components/roadmap/rm-content/rm-card-snapshot/rm-card-snapshot.component';
import { RmContentComponent } from './components/roadmap/rm-content/rm-content.component';
import { RmHeaderComponent } from './components/roadmap/rm-header/rm-header.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { SprintCongratulationsComponent } from './components/sprint-congratulations/sprint-congratulations.component';
import { DesignSprintOverlayComponent } from './components/sprint-dashboard/design-sprint-overlay/design-sprint-overlay.component';
import { ResponseMenuDialogComponent } from './components/sprint-dashboard/modals/response-menu-dialog/response-menu-dialog.component';
import { SdBottomDialogComponent } from './components/sprint-dashboard/modals/sd-bottom-dialog/sd-bottom-dialog.component';
import { SdMyadviceComponent } from './components/sprint-dashboard/modals/sd-myadvice/sd-myadvice.component';
import { SdMycommentsComponent } from './components/sprint-dashboard/modals/sd-mycomments/sd-mycomments.component';
import { SprintDashboardComponent } from './components/sprint-dashboard/sprint-dashboard.component';
import { TrendLineChartComponent } from './components/trend/trend-line-chart/trend-line-chart.component';
import { TrendComponent } from './components/trend/trend.component';
import { UpdatedChartsComponent } from './components/trend/updated-charts/updated-charts.component';
import { ViewEventDataComponent } from './components/view-event-data/view-event-data.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { ViewingRightsComponent } from './components/viewing-rights/viewing-rights.component';
import { VrHeadingComponent } from './components/viewing-rights/vr-heading/vr-heading.component';
import { VrManagerComponent } from './components/viewing-rights/vr-manager/vr-manager.component';
import { VrSearchComponent } from './components/viewing-rights/vr-search/vr-search.component';
import { BottomNavComponent } from './layout/bottom-nav/bottom-nav.component';
import { SprintComponent } from './sprint.component';
import { sprintRoutes } from './sprint.routes';
import { PortfolioSavedDialogComponent } from './components/sprint-dashboard/modals/portfolio-saved-dialog/portfolio-saved-dialog.component';

@NgModule({
  declarations: [
    FeedForwardComponent,
    RoadmapComponent,
    ViewingRightsComponent,
    FfHeadingComponent,
    FfSupportCrewComponent,
    FfContactCardGroupComponent,
    FfContactCardComponent,
    FfSearchComponent,
    RmContentComponent,
    RmCardSnapshotComponent,
    RmCardPerformanceComponent,
    RmCardRoadmapComponent,
    RmHeaderComponent,
    RmCalendarComponent,
    VrHeadingComponent,
    VrSearchComponent,
    VrManagerComponent,
    ViewEventDialogComponent,
    EditEventDialogComponent,
    AddEventDialogComponent,
    CalendarComponent,
    EffortComponent,
    TrendComponent,
    TrendLineChartComponent,
    BottomNavComponent,
    AddEventCalendarDialogComponent,
    ViewEventCalendarDialogComponent,
    EditEventCalendarDialogComponent,
    SprintDashboardComponent,
    EventDeleteDialogComponent,
    ResponseMenuDialogComponent,
    SdMycommentsComponent,
    SdMyadviceComponent,
    SdBottomDialogComponent,
    WcReviewDialogComponent,
    ExtendDialogComponent,
    SprintCongratulationsComponent,
    SprintReviewEventDialogComponent,
    NotStartedSprintComponent,
    SelectActivityDialogComponent,
    AddStakeholderDialogComponent,
    SelectStakeholderDialogComponent,
    SelectCrewDialogComponent,
    SelectActionDialogComponent,
    WcNotificationDialogComponent,
    AddEventBottomDialogComponent,
    DesignSprintOverlayComponent,
    UpdatedChartsComponent,
    EventCalenderComponent,
    ViewEventComponent,
    AddEventComponent,
    AddStakeholderComponent,
    ViewEventDataComponent,
    EditEventDataComponent,
    ConfirmationModalComponent,
    TeamsReviewModalComponent,
    SprintOnMobileDialogComponent,
    SprintComponent,
    PortfolioSavedDialogComponent,
  ],
  imports: [
    CommonModule,
    OverlayModule,
    RouterModule.forChild(sprintRoutes),
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    jqxSchedulerModule,
    MatMenuModule,
    FullCalendarModule,
    NgxSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgScatterDirectionalChartModule,
    NgxChartsModule,
    ChartsModule,
    HelipopperModule.forRoot(),
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    NgxMaterialTimepickerModule,
    NguCarouselModule,
    MatCheckboxModule,
    MatDatepickerModule,
    DpDatePickerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    jqxSchedulerModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatTooltipModule,
    NgxQRCodeModule,
  ],

  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [BottomNavComponent,
    EffortComponent],
})
export class SprintModule { }
