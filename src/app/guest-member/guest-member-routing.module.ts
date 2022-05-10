import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlignSurveyComponent } from './align-survey/align-survey.component';
import { GuestTeamDashboardComponent } from './guest-team-dashboard/guest-team-dashboard.component';
import { GuestDevelopmentPlanComponent } from './guest-development-plan/guest-development-plan.component';
import { JoinTeamComponent } from './join-team/join-team.component';

const routes: Routes = [
  {
    path: 'startSurvey',
    component: AlignSurveyComponent
  },
  {
    path: 'join-team',
    component: JoinTeamComponent
  },
  {
    path: 'view-dashboard/:team_id',
    component: GuestTeamDashboardComponent
  },
  {
    path: 'view-design/:id',
    component: GuestDevelopmentPlanComponent
  },
  {
    path: 'view-reports/:id',
    // component: GuestDevelopmentPlanComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestMemberRoutingModule { }