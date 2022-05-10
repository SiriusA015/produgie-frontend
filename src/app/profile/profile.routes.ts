import { ProfileViewingRightsComponent } from './components/profile-viewing-rights/profile-viewing-rights.component';
import { ActiveConsentComponent } from './components/active-consent/active-consent.component';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileFinalComponent } from './components/profile-final/profile-final.component';
import { Routes } from '@angular/router';
export const profileRoutes: Routes = [
    {
      path: '',
      redirectTo: 'general-settings'
    },
    {
        path: 'general-settings',
        component: GeneralSettingsComponent
    },
    {
        path: 'active-consent',
        component: ActiveConsentComponent
    },
    {
        path: 'viewing-rights',
        component: ProfileViewingRightsComponent
    },
    {
        path: 'my-history',
        component: HistoryComponent
    },
    {
        path: 'sprint-detail/:id',
        component: ProfileFinalComponent
    }
  ];
