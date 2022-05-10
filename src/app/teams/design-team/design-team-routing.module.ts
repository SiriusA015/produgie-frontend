import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamWelcomeDesignComponent } from '../design-team/team-welcome-design/team-welcome-design.component';
import { RoleGuard } from '../../shared/guards/role.guard';
import { ConfigureComponent } from './configure/configure.component';
import { TeamDevPlanComponent } from './team-dev-plan/team-dev-plan.component';
import { TeamSprintCrewComponent } from './team-sprint-crew/team-sprint-crew.component';
import { TeamSprintFrequencyComponent } from './team-sprint-frequency/team-sprint-frequency.component';
import { TeamsFadPriorityComponent } from './teams-fad-priority/teams-fad-priority.component';
import { TeamsFadComponent } from './teams-fad/teams-fad.component';
import { TeamsSprintConfigureComponent } from './teams-sprint-configure/teams-sprint-configure.component';


const routes: Routes = [
  {
    path: 'welcome',
    component: TeamWelcomeDesignComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teams-fad',
    component: TeamsFadComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teams-fad-priority',
    component: TeamsFadPriorityComponent,
    canActivate: [RoleGuard],
  },
  {
    path:'teams-sprint-configure',
    component: TeamsSprintConfigureComponent,
    canActivate: [RoleGuard],
  },
  {
    path:'configure',
    component: ConfigureComponent
  },
  {
    path:'teams-sprint-crew',
    component: TeamSprintCrewComponent,
    canActivate: [RoleGuard],
  },
  {
    path:'teams-sprint-frquency',
    component: TeamSprintFrequencyComponent,
    canActivate: [RoleGuard],
  },
  {
    path:'dev-plan',
    component: TeamDevPlanComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignTeamRoutingModule { }