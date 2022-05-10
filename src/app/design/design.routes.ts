import { FadDetailsComponent } from './components/modals/fad-details/fad-details.component';
import { CongratulationsComponent } from './components/congratulations/congratulations.component';
import { DesignWelcomeComponent } from './components/design-welcome/design-welcome.component';
import { DesignFinalComponent } from './components/design-final/design-final.component';
import { Routes } from '@angular/router';
import { DesignStrengthComponent } from './components/design-strength/design-strength.component';
import { FocusDevelopmentComponent } from './components/focus-development/focus-development.component';
import { ConfigureSprintComponent } from './components/configure-sprint/configure-sprint.component';
import { ConfigureSprintActionComponent } from './components/configure-sprint/configure-sprint-action/configure-sprint-action.component';
import { ConfigureSprintStrengthComponent } from './components/configure-sprint/configure-sprint-strength/configure-sprint-strength.component';
import { ConfigureSprintOutcomeComponent } from './components/configure-sprint/configure-sprint-outcome/configure-sprint-outcome.component';
import { ConfigureSprintFrequencyComponent } from './components/configure-sprint/configure-sprint-frequency/configure-sprint-frequency.component';
import { SprintCrewComponent } from './components/sprint-crew/sprint-crew.component';
import { SprintCrewRoleComponent } from './components/sprint-crew-role/sprint-crew-role.component';
import { FinalSprintDesignComponent } from './components/final-sprint-design/final-sprint-design.component';
import { ConfigureSprintSelectComponent } from './components/configure-sprint/configure-sprint-select/configure-sprint-select.component';
import { ConfigureSprintBehaviourComponent } from './components/configure-sprint/configure-sprint-behaviour/configure-sprint-behaviour.component';
import { FadComponent } from './components/fad/fad.component';
import { FadPriorityComponent } from './components/fad-priority/fad-priority.component';

export const strengthRoutes: Routes = [
  {
    path: '',
    component: DesignWelcomeComponent
  },
  {
    path: 'sprint',
    component: ConfigureSprintSelectComponent
  },
  {
    path: 'sprint-configure',
    component: ConfigureSprintComponent
  },
  {
    path: 'sprint-focus',
    component: FocusDevelopmentComponent
  },
  {
    path: 'fad',
    component: FadComponent
  },
  {
    path: 'fad-priority',
    component: FadPriorityComponent
  },
  {
    path: 'sprint-action/:id',
    component: ConfigureSprintActionComponent
  },
  {
    path: 'sprint-behaviour/:id',
    component: ConfigureSprintBehaviourComponent
  },
  {
    path: 'sprint-strenght',
    component: ConfigureSprintStrengthComponent
  },
  {
    path: 'sprint-outcome/:id',
    component: ConfigureSprintOutcomeComponent
  },
  {
    path: 'sprint-frequency',
    component: ConfigureSprintFrequencyComponent
  },
  {
    path: 'sprint-crew',
    component: SprintCrewComponent
  },
  {
    path: 'sprint-crew-role',
    component: SprintCrewRoleComponent
  },
  {
    path: 'sprint-final',
    component: DesignFinalComponent
  },
  {
    path: 'sprint-complete',
    component: CongratulationsComponent
  },
];
