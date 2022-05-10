import { DevPanViewVrComponent } from './components/dev-pan-view-vr/dev-pan-view-vr.component';
import { DevPlanCrewViewComponent } from './components/dev-plan-crew-view/dev-plan-crew-view.component';
import { DevPlanFeedbackComponent } from './components/dev-plan-feedback/dev-plan-feedback.component';
import { DevPlanComponent } from './components/dev-plan/dev-plan.component';

import { Routes } from '@angular/router';
import { DevPlanFinalFeedbackComponent } from './components/dev-plan-final-feedback/dev-plan-final-feedback.component';
export const developemntRoutes: Routes = [
    {
      path: 'advice/:uuid/:token',
      component: DevPlanComponent
    },
    {
      path: 'feedback/:uuid/:token',
      component: DevPlanFeedbackComponent
    },
    {
      path: 'feedback-final/:uuid/:token',
      component: DevPlanFinalFeedbackComponent
    },
    {
      path: 'view/:uuid/:token',
      component: DevPlanCrewViewComponent
    },
    {
      path: 'view-vr/:uuid/:token',
      component: DevPanViewVrComponent
    },
  ];
