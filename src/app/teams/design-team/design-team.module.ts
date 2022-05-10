import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTeamRoutingModule } from '../design-team/design-team-routing.module';
import { TeamWelcomeDesignComponent } from '../design-team/team-welcome-design/team-welcome-design.component';
import { TeamsFadComponent } from './teams-fad/teams-fad.component';
import { TeamsLeftNavComponent } from './teams-left-nav/teams-left-nav.component';
import { TeamsFadPriorityComponent } from './teams-fad-priority/teams-fad-priority.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TeamsSprintConfigureComponent } from './teams-sprint-configure/teams-sprint-configure.component';
import { MatSelectModule } from '@angular/material/select';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamSprintCrewComponent } from './team-sprint-crew/team-sprint-crew.component';
import { TeamSprintFrequencyComponent } from './team-sprint-frequency/team-sprint-frequency.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatMenuModule } from '@angular/material/menu';
import { ConfigureComponent } from './configure/configure.component';
import { ActionComponent } from './configure/action/action.component';
import { BehavioursComponent } from './configure/behaviours/behaviours.component';
import { OutcomesComponent } from './configure/outcomes/outcomes.component';
import { StrengthAndPrioritiesComponent } from './team-dev-plan/strength-and-priorities/strength-and-priorities.component';
import { CurrentSprintComponent } from './team-dev-plan/current-sprint/current-sprint.component';
import { ActionBehaviourOutcomeComponent } from './team-dev-plan/action-behaviour-outcome/action-behaviour-outcome.component';
import { SprintCrewComponent } from './team-dev-plan/sprint-crew/sprint-crew.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TeamDevPlanComponent } from '../design-team/team-dev-plan/team-dev-plan.component';
import { TeamsTokenInterceptor } from '../services/teams-interceptors/teams-token.interceptor';
import { MatRadioModule } from '@angular/material/radio';
import { HelipopperModule } from '@ngneat/helipopper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTableModule } from '@angular/cdk/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NguCarouselModule } from '@ngu/carousel';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { strengthRoutes } from 'src/app/design/design.routes';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AddLeadAddStakeholderComponent } from './configure/add-lead-add-stakeholder/add-lead-add-stakeholder.component';
import { EditSprintCrewComponent } from './edit-sprint-crew/edit-sprint-crew.component';
import { DeleteSprintCrewComponent } from './delete-sprint-crew/delete-sprint-crew.component';
import { IgxCalendarModule } from 'igniteui-angular';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeamSprintSaveComponent } from './Modal/team-sprint-save/team-sprint-save.component';
import { TeamDesignStatusComponent } from './Modal/team-sprint-save/team-design-status/team-design-status.component';
import { TeamWarningComponent } from './Modal/team-warning/team-warning.component';
import { TeamCongratulationComponent } from './team-congratulation/team-congratulation.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DesignService } from './design.service';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
@NgModule({
  declarations: [
    TeamWelcomeDesignComponent,
    TeamsFadComponent,
    TeamsLeftNavComponent,
    TeamsFadPriorityComponent,
    TeamsSprintConfigureComponent,
    TeamSprintCrewComponent,
    TeamSprintFrequencyComponent,
    ConfigureComponent,
    ActionComponent,
    BehavioursComponent,
    OutcomesComponent,
    TeamDevPlanComponent,
    StrengthAndPrioritiesComponent,
    CurrentSprintComponent,
    ActionBehaviourOutcomeComponent,
    SprintCrewComponent,
    AddLeadAddStakeholderComponent,
    EditSprintCrewComponent,
    DeleteSprintCrewComponent,
    TeamSprintSaveComponent,
    TeamDesignStatusComponent,
    TeamWarningComponent,
    TeamCongratulationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(strengthRoutes),
    DragDropModule,
    MatDialogModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    OverlayModule,
    IgxCalendarModule,
    NgxMaterialTimepickerModule,
    NguCarouselModule,
    CustomFormsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    CdkTableModule,
    MatTableModule,
    MatAutocompleteModule,
    DesignTeamRoutingModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    Ng5SliderModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatMenuModule,
    MatRadioModule,
    MatMenuModule,
    MatTooltipModule,
    NgxQRCodeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    HelipopperModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    StrengthAndPrioritiesComponent,
    CurrentSprintComponent,
    ActionBehaviourOutcomeComponent,
    SprintCrewComponent,
  ],
  providers: [
    DesignService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TeamsTokenInterceptor,
      multi: true,
    }
  ],
})
export class DesignTeamModule { }
