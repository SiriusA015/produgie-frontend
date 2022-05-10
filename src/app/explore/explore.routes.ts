import { ImpactSessionComponent } from './components/impact-session/impact-session.component';
import { MySnapshotComponent } from './components/my-snapshot/my-snapshot.component';
import { AboutGrowthLeadersComponent } from './components/about-growth-leaders/about-growth-leaders.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { Routes } from '@angular/router';
import { DetailedReportHeadingComponent } from './components/modals/detailed-report-heading/detailed-report-heading.component';
export const exploreRoutes: Routes = [
    {
      path: '',
      redirectTo: 'aboutme'
    },
    {
      path: 'aboutme',
      component: AboutMeComponent
    },
    {
      path: 'aboutgrowthleaders',
      component: AboutGrowthLeadersComponent
    },
    {
      path: 'mysnapshot',
      component: MySnapshotComponent
    },
    {
      path: 'impactsession',
      component: ImpactSessionComponent
    },
    {
      path: 'test',
      component: DetailedReportHeadingComponent
    }
];
