import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Routes } from '@angular/router';
import { PolicyConsentComponent } from './components/policy-consent/policy-consent.component';
import { SsoCallbackComponent } from './components/sso-callback/sso-callback.component';
import { SsoCallbackGoogleComponent } from './components/sso-callback-google/sso-callback-google.component';
import { SsoCallbackAzureComponent } from './components/sso-callback-azure/sso-callback-azure.component';
import { SsoCallbackCronofyComponent } from './components/sso-callback-cronofy/sso-callback-cronofy.component';
import { SsoCallbackOktaComponent } from './components/sso-callback-okta/sso-callback-okta.component';
import { NoOktaGuard } from '../shared/guards/no-okta.guard';
import { OktaLoginRedirectComponent } from '@okta/okta-angular';
import { CallbackOktaComponent } from './components/callback-okta/callback-okta.component';

export const authRoutes: Routes = [
  {
    path: '',
    // redirectTo: 'verify-email'
    redirectTo: 'login'
  },
  {
    path: 'signup/:uuid/:token',
    component: SignupComponent
  },
  {
    path: 'login',
    // canActivate: [NoOktaGuard],
    component: LoginComponent    
  },
  // {
  //   path: 'verify-email',
  //   canActivate: [NoOktaGuard],
  //   component: LoginComponent    
  // },
  {
    path: 'policy-consent',
    component: PolicyConsentComponent
  },
  {
    path: 'reset/:uuid/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'sso',
    component: SsoCallbackComponent
  },
  {
    path: 'sso/google',
    component: SsoCallbackGoogleComponent
  },
  {
    path: 'sso/azure',
    component: SsoCallbackAzureComponent
  },
  {
    path: 'sso/cronofy/:type',
    component: SsoCallbackCronofyComponent
  },
  {
    path: 'sso/okta',
    component: SsoCallbackOktaComponent
  },
  // {
  //   path: 'login',
  //   component: OktaLoginRedirectComponent
  // }, 
  {
    path: 'okta/callback',
    component: CallbackOktaComponent
  },
];
