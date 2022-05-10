

import { Routes } from '@angular/router';
import { GlaRatingComponent } from './components/gla-rating/gla-rating.component';
export const glRoutes: Routes = [
    {
      path: 'rating/:uuid/:token',
      component: GlaRatingComponent
    }
  ];
