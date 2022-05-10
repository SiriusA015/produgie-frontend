import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderComponent } from './components/calender/calender.component';
import { TeamEffortComponent } from './components/team-effort/team-effort.component';
import { TeamRoadmapComponent } from './components/team-roadmap/team-roadmap.component';
import { RoleGuard } from '../../shared/guards/role.guard';
import { TeamSprintDashboardComponent } from './components/team-sprint-dashboard/team-sprint-dashboard.component';
import { TeamTrendsComponent } from './components/team-trends/team-trends.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: TeamSprintDashboardComponent,
    // canActivate: [RoleGuard],
  },
  {
    path: 'roadmap',
    component: TeamRoadmapComponent
  },
  {
    path: 'trends',
    component: TeamTrendsComponent
  },
  {
    path: 'efforts',
    component: TeamEffortComponent
  },
  {
    path: 'calender',
    component: CalenderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintTeamRoutingModule { }
