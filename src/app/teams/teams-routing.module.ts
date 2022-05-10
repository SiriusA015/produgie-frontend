import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamSettingComponent } from '../teams/team/team-settings/team-settings.component';
import { TeamsSetupComponent } from '../teams/team/teams-setup/teams-setup.component';
import { ViewingRightsComponent } from '../teams/team/viewing-rights/viewing-rights.component';
import { IncompleteGlaComponent } from './incomplete-gla/incomplete-gla.component';
import { RoleGuard } from '../shared/guards/role.guard';
import { TeamActivityComponent } from './team-activity/team-activity.component';
import { OktaAuthGuard } from '../shared/guards/okta-auth-guard';
import { TeamCongratulationComponent } from './design-team/team-congratulation/team-congratulation.component';
import { Role } from '../auth/Role';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [OktaAuthGuard, RoleGuard],
    component:TeamActivityComponent,
    data: {
      roles: [Role.TEAM_MANAGER, Role.TEAM_MEMBER]
    }
 },
 {
  path: 'congratulation',
  component:TeamCongratulationComponent,
  },
  {
    path: 'explore',
    canActivate: [OktaAuthGuard, RoleGuard],
    data: {
      roles: [Role.TEAM_MANAGER, Role.TEAM_MEMBER]
    },
    loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule),
  },
  {
    path: 'design',
    canActivate: [OktaAuthGuard, RoleGuard],
    data: {
      roles: [Role.TEAM_MANAGER, Role.TEAM_MEMBER]
    },
    loadChildren: () => import('./design-team/design-team.module').then(m => m.DesignTeamModule),
  },
  {
    path: 'sprint',
    canActivate: [OktaAuthGuard, RoleGuard],
    data: {
      roles: [Role.TEAM_MANAGER, Role.TEAM_MEMBER]
    },
    loadChildren: () => import('./sprint-team/sprint-team.module').then(m => m.SprintTeamModule),
  },
  {
    path: 'member',
    canActivate: [OktaAuthGuard, RoleGuard],
    data: {
      roles: [Role.TEAM_MEMBER]
    },
    loadChildren: () => import('./team-member/team-member.module').then(m => m.TeamMemberModule),
  },


  {
    path: 'teams-setup',
    canActivate: [OktaAuthGuard, RoleGuard],
    component:TeamsSetupComponent,
    data: {
      roles: [Role.TEAM_MANAGER]
    },
  },
  {
    path: 'viewing-rights',
    canActivate: [OktaAuthGuard, RoleGuard],
    component:ViewingRightsComponent,
    data: {
      roles: [Role.TEAM_MANAGER, Role.TEAM_MEMBER]
    },
  },
  {
    path: 'team-settings',
    canActivate: [OktaAuthGuard,RoleGuard],
    component:TeamSettingComponent,   
    data: {
      roles: [Role.TEAM_MANAGER, Role.TEAM_MEMBER]
    },
  },
  {
    path: 'incomplete-gla',
    component:IncompleteGlaComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
