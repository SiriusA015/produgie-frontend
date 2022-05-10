import { DesignKeyComponent } from './components/design-final/key/key.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignStrengthComponent } from './components/design-strength/design-strength.component';
import { RouterModule } from '@angular/router';
import { strengthRoutes } from './design.routes';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FocusDevelopmentComponent } from './components/focus-development/focus-development.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConfigureSprintComponent } from './components/configure-sprint/configure-sprint.component';
import { ConfigureSprintOutcomeComponent } from './components/configure-sprint/configure-sprint-outcome/configure-sprint-outcome.component';
import { ConfigureSprintActionComponent } from './components/configure-sprint/configure-sprint-action/configure-sprint-action.component';
import { ConfigureSprintStrengthComponent } from './components/configure-sprint/configure-sprint-strength/configure-sprint-strength.component';
import { ConfigureSprintFrequencyComponent } from './components/configure-sprint/configure-sprint-frequency/configure-sprint-frequency.component';
import { SprintCrewComponent } from './components/sprint-crew/sprint-crew.component';
import { SprintCrewRoleComponent } from './components/sprint-crew-role/sprint-crew-role.component';
import { FinalSprintDesignComponent } from './components/final-sprint-design/final-sprint-design.component';
import { FsStrengthsComponent } from './components/final-sprint-design/fs-strengths/fs-strengths.component';
import { FsFocusComponent } from './components/final-sprint-design/fs-focus/fs-focus.component';
import { FsSprintComponent } from './components/final-sprint-design/fs-sprint/fs-sprint.component';
import { FsSprintCrewComponent } from './components/final-sprint-design/fs-sprint-crew/fs-sprint-crew.component';
import { FsWeeklyCheckinComponent } from './components/final-sprint-design/fs-weekly-checkin/fs-weekly-checkin.component';
import { ConfigureSprintSelectComponent } from './components/configure-sprint/configure-sprint-select/configure-sprint-select.component';
import { ConfigureSprintBehaviourComponent } from './components/configure-sprint/configure-sprint-behaviour/configure-sprint-behaviour.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { InviteDialogComponent } from './components/configure-sprint/modals/invite-dialog/invite-dialog.component';
import { Ng5SliderModule } from 'ng5-slider';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { DesignFinalComponent } from './components/design-final/design-final.component';
import { DesignResilienceComponent } from './components/design-final/resilience/resilience.component';
import { DesignSnapshotComponent } from './components/design-final/snapshot/snapshot.component';
import { DesignContactCardComponent } from './components/design-final/contact-card/contact-card.component';
import { DesignSummaryComponent } from './components/design-final/summary/summary.component';
import { DesignSummaryDetailsComponent } from './components/design-final/summary-details/summary-details.component';
import { DesignSprintRolesComponent } from './components/design-final/sprint-roles/sprint-roles.component';
import { DesignWelcomeComponent } from './components/design-welcome/design-welcome.component';
import { NguCarouselModule } from '@ngu/carousel';
import { CustomFormsModule } from 'ngx-custom-validators';
import { WarningModalComponent } from './components/design-final/modals/warning-modal/warning-modal.component';
import { PriotityWarningModalComponent } from './components/design-final/modals/priority-warning-modal/priority-warning-modal.component';
import { SprintWarningModalComponent } from './components/design-final/modals/sprint-warning-modal/sprint-warning-modal.component';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { SaveModalComponent } from './components/design-final/modals/save-modal/save-modal.component';
import { SprintCrewAddDialogComponent } from './components/sprint-crew/modals/sprint-crew-add-dialog/sprint-crew-add-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { FadDetailsComponent } from './components/modals/fad-details/fad-details.component';
import { FadComponent } from './components/fad/fad.component';
import { FadPriorityComponent } from './components/fad-priority/fad-priority.component';
import { HelipopperModule } from '@ngneat/helipopper';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../services/interceptors/token.interceptor';
import { SprintChangeWarningComponent } from './components/design-final/modals/sprint-change-warning/sprint-change-warning.component';
import { DesignBlankLayoutComponent } from './design-blank-layout/design-blank-layout.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { EditScrewComponent } from './components/edit-screw/edit-screw.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ConfirmDialogComponent } from './components/Notification-Dialog/confirm-dialog/confirm-dialog.component';
import { ChangeSprintDialogComponent } from './components/Notification-Dialog/change-sprint-dialog/change-sprint-dialog.component';
import { DesignstatusConfirmationComponent } from './components/Notification-Dialog/confirm-dialog/designstatus-confirmation/designstatus-confirmation.component';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StakeholderComponent } from './components/stakeholder/stakeholder.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { ClipboardModule } from '@angular/cdk/clipboard';
@NgModule({
  declarations: [
    DesignStrengthComponent,
    ConfigureSprintComponent,
    ConfigureSprintOutcomeComponent,
    ConfigureSprintActionComponent,
    ConfigureSprintStrengthComponent,
    ConfigureSprintFrequencyComponent,
    FocusDevelopmentComponent,
    SprintCrewComponent,
    SprintCrewRoleComponent,
    FinalSprintDesignComponent,
    FsStrengthsComponent,
    FsFocusComponent,
    FsSprintComponent,
    FsSprintCrewComponent,
    FsWeeklyCheckinComponent,
    ConfigureSprintSelectComponent,
    ConfigureSprintBehaviourComponent,
    SprintCrewAddDialogComponent,
    InviteDialogComponent,
    DesignFinalComponent,
    DesignResilienceComponent,
    DesignSnapshotComponent,
    DesignContactCardComponent,
    DesignSummaryComponent,
    DesignSummaryDetailsComponent,
    DesignSprintRolesComponent,
    DesignKeyComponent,
    DesignWelcomeComponent,
    WarningModalComponent,
    PriotityWarningModalComponent,
    SprintWarningModalComponent,
    LeftNavComponent,
    SaveModalComponent,
    CongratulationsComponent,
    FadDetailsComponent,
    FadComponent,
    FadPriorityComponent,
    SprintChangeWarningComponent,
    DesignBlankLayoutComponent,
    EditScrewComponent,
    ConfirmationModalComponent,
    ConfirmDialogComponent,
    ChangeSprintDialogComponent,
    DesignstatusConfirmationComponent,
    StakeholderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(strengthRoutes),
    MatIconModule,
    SharedModule,
    DragDropModule,
    MatDialogModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    OverlayModule,
    Ng5SliderModule,
    NgxQRCodeModule,
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
    MatSnackBarModule,
    MatCardModule,
    CdkTableModule,
    MatTableModule,
    MatRadioModule,
    FormsModule,
    MatAutocompleteModule,
    ClipboardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  entryComponents: [SprintCrewAddDialogComponent],

  exports: [
     DesignSnapshotComponent,
    DesignContactCardComponent,
    DesignSummaryComponent,
    DesignSummaryDetailsComponent,
    DesignSprintRolesComponent,
    DesignKeyComponent,
  ]
})
export class DesignModule { }
