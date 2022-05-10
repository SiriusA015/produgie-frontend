import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamPortalComponent } from './team-portal/team-portal.component';
import { ExploreNavbarComponent } from './explore-navbar/explore-navbar.component';
import { GrowthLeaderTeamProfileComponent } from './growth-leader-team-profile/growth-leader-team-profile.component';
// import { TestingComponent } from './testing/testing.component';
import {TeamAlignmentProfileComponent} from './team-alignment-profile/team-alignment-profile.component'
import { RoleGuard } from '../../shared/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'team-explore',
    component: ExploreNavbarComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'team-portal',
    component: TeamPortalComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'growth-leader-teams-profile',
    component: GrowthLeaderTeamProfileComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'teams-alignment-profile',
    component: TeamAlignmentProfileComponent,
    canActivate: [RoleGuard],
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreRoutingModule { }
