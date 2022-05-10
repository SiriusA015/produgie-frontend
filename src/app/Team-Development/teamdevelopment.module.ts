import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamdevelopmentRoutingModule } from './teamdevelopment-routing.module';
import { TeamFeebackComponent } from './team-feeback/team-feeback.component';
import { TeamAdviceComponent } from './team-advice/team-advice.component';
import { DesignTeamModule } from '../teams/design-team/design-team.module';
import { SharedModule } from '../shared/shared.module';
import { NguCarouselModule } from '@ngu/carousel';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TeamAdviceDialogFormComponent } from './form-dailog/team-advice-dialog-form/team-advice-dialog-form.component';
import { TeamFeedbackDialogFormComponent } from './form-dailog/team-feedback-dialog-form/team-feedback-dialog-form.component';
import { TeamThankYouComponent } from './form-dailog/team-thank-you/team-thank-you.component';


@NgModule({
  declarations: [TeamFeebackComponent, TeamAdviceComponent, TeamAdviceDialogFormComponent, TeamFeedbackDialogFormComponent, TeamThankYouComponent],
  imports: [
    CommonModule,
    TeamdevelopmentRoutingModule,
    DesignTeamModule,
    CommonModule,
    SharedModule,
    MatDialogModule,
    NguCarouselModule,
    MatIconModule
  ],

})
export class TeamdevelopmentModule { }
