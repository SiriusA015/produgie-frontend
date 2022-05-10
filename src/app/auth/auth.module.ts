import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authRoutes } from './auth.routes';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PolicyConsentComponent } from './components/policy-consent/policy-consent.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SsoCallbackComponent } from './components/sso-callback/sso-callback.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SsoCallbackGoogleComponent } from './components/sso-callback-google/sso-callback-google.component';
import { SsoCallbackAzureComponent } from './components/sso-callback-azure/sso-callback-azure.component';
import { CronofyAlertComponent } from './components/cronofy-alert/cronofy-alert.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningAlertComponent } from './components/warning-alert/warning-alert.component';
import { SsoCallbackCronofyComponent } from './components/sso-callback-cronofy/sso-callback-cronofy.component';
import { SsoCallbackOktaComponent } from './components/sso-callback-okta/sso-callback-okta.component';
import { CallbackOktaComponent } from './components/callback-okta/callback-okta.component';

@NgModule({
  declarations: [
    ResetPasswordComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    PolicyConsentComponent,
    SsoCallbackComponent,
    SsoCallbackGoogleComponent,
    SsoCallbackAzureComponent,
    CronofyAlertComponent,
    WarningAlertComponent,
    SsoCallbackCronofyComponent,
    SsoCallbackOktaComponent,
    CallbackOktaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    SharedModule,
    MatIconModule,
    ReactiveFormsModule,
    CustomFormsModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule
  ],
})
export class AuthModule {}
