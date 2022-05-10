import { NguCarouselModule } from '@ngu/carousel';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { TeamMemberRoutingModule } from './team-member-routing.module';
import { TeamMemberNavbarComponent } from './team-member-navbar/team-member-navbar.component';
import { TeamMemberViewComponent } from './team-member-view/team-member-view.component';
import { TeamMemberViewingRightsComponent } from './team-member-viewing-rights/team-member-viewing-rights.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TeamMemberDevPlanComponent } from './team-member-dev-plan/team-member-dev-plan.component';
import { DesignTeamModule } from '../design-team/design-team.module';


@NgModule({
  declarations: [TeamMemberNavbarComponent, TeamMemberViewComponent, TeamMemberViewingRightsComponent, TeamMemberDevPlanComponent],
  imports: [
    CommonModule,
    TeamMemberRoutingModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    DesignTeamModule,
    NguCarouselModule
  ]
})
export class TeamMemberModule { }
