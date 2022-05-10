import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { TeamMemberDevPlanComponent } from './team-member-dev-plan/team-member-dev-plan.component';
import { TeamMemberViewComponent } from './team-member-view/team-member-view.component';
import { TeamMemberViewingRightsComponent } from './team-member-viewing-rights/team-member-viewing-rights.component';

const routes: Routes = [
  {
    path: 'team-details',
    component: TeamMemberViewComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'viewing-rights',
    component: TeamMemberViewingRightsComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teamMember-devplan',
    component: TeamMemberDevPlanComponent,
    canActivate: [RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMemberRoutingModule { }
