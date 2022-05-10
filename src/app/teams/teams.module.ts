import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsSetupComponent } from '../teams/team/teams-setup/teams-setup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TeamSettingComponent } from '../teams/team/team-settings/team-settings.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ViewingRightsComponent } from '../teams/team/viewing-rights/viewing-rights.component';
import { TeamsNavbarComponent } from '../teams/team/teams-navbar/teams-navbar.component';
import { ConfirmationModalComponent } from './team/confirmation-modal/confirmation-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { IncompleteGlaComponent } from './incomplete-gla/incomplete-gla.component';
import { TeamService } from './team.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TeamActivityComponent } from './team-activity/team-activity.component';
import { DesignTeamModule } from './design-team/design-team.module';
import { SharedModule } from '../shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ConfirmationPromptComponent } from './team/confirmation-prompt/confirmation-prompt.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { TeamMemberRoutingModule } from '../teams/team-member/team-member-routing.module';
import{TeamMemberModule} from '../teams/team-member/team-member.module';
import { DateAgoPipe } from '../pipes/date-ago.pipe';
@NgModule({
  declarations: [
    TeamsSetupComponent,
    TeamSettingComponent,
    ViewingRightsComponent,
    TeamsNavbarComponent,
    IncompleteGlaComponent,
    ConfirmationModalComponent,
    TeamActivityComponent,
    ConfirmationPromptComponent,
    DateAgoPipe
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatAutocompleteModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    SharedModule,
    MatIconModule,
    DesignTeamModule,
    TeamMemberRoutingModule,
    MatProgressBarModule,
    MatMenuModule,
    TeamMemberModule,
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
  providers: [
    {
      provide: ToastrService,
    },
    TeamService,
  ],
})
export class TeamsModule {}
