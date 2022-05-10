import { Routes } from '@angular/router';
import { SprintComponent } from 'src/app/sprint/sprint.component';
import { EffortComponent } from './components/effort/effort.component';
import { EventCalenderComponent } from './components/event-calender/event-calender.component';
import { FeedForwardComponent } from './components/feed-forward/feed-forward.component';
import { WcReviewDialogComponent } from './components/modals/wc-review-dialog/wc-review-dialog.component';
import { NotStartedSprintComponent } from './components/not-started-sprint/not-started-sprint.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { SprintCongratulationsComponent } from './components/sprint-congratulations/sprint-congratulations.component';
import { SprintDashboardComponent } from './components/sprint-dashboard/sprint-dashboard.component';
import { TrendComponent } from './components/trend/trend.component';
import { ViewingRightsComponent } from './components/viewing-rights/viewing-rights.component';

export const sprintRoutes: Routes = [
  {
    path: '',
    component: SprintComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'feed-forward',
        component: FeedForwardComponent
      },
      {
        path: 'roadmap',
        component: RoadmapComponent
      },
      {
        path: 'calendar',
        component: EventCalenderComponent
      },
      {
        path: 'viewing-rights',
        component: ViewingRightsComponent
      },
      {
        path: 'effort',
        component: EffortComponent
      },
      {
        path: 'trend',
        component: TrendComponent
      },
      {
        path: 'dashboard',
        component: SprintDashboardComponent
      },
      {
        path: 'congratulations',
        component: SprintCongratulationsComponent
      },
      {
        path: 'wc',
        component: WcReviewDialogComponent
      },
      {
        path: 'not-started',
        component: NotStartedSprintComponent
      }
    ]
  }
];

