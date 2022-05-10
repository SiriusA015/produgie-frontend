import { MyPortfolioComponent } from './components/my-portfolio/my-portfolio.component';
import { Routes } from '@angular/router';
import { CongratsComponent } from './components/congrats/congrats.component';
import { MyDevPlanComponent } from './components/my-dev-plan/my-dev-plan.component';
import { DashViewingRightsComponent } from './components/user-dashboard/dash-viewing-rights/dash-viewing-rights.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UpdatedDashboardComponent } from './components/updated-dashboard/updated-dashboard.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: MyDevPlanComponent
  },
  {
    path: 'congratulation',
    component: CongratsComponent
  },
  {
    path: 'my-dashboard1',
    component: UserDashboardComponent
  },
  {
    path: 'viewing-rights',
    component: DashViewingRightsComponent
  },
  {
    path: 'my-portfolio',
    component: MyPortfolioComponent
  },
  {
    path: 'my-dashboard',
    component: UpdatedDashboardComponent
  }
];

