import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { profileRoutes } from './profile.routes';
import { RouterModule } from '@angular/router';
import { GeneralSettingsComponent } from './components/general-settings/general-settings.component';
import { ActiveConsentComponent } from './components/active-consent/active-consent.component';
import { ProfileViewingRightsComponent } from './components/profile-viewing-rights/profile-viewing-rights.component';
import { ProfileFinalComponent } from './components/profile-final/profile-final.component';
import { DesignResilienceComponent } from './components/profile-final/resilience/resilience.component';
import { DesignSnapshotComponent } from './components/profile-final/snapshot/snapshot.component';
import { DesignContactCardComponent } from './components/profile-final/contact-card/contact-card.component';
import { DesignSummaryComponent } from './components/profile-final/summary/summary.component';
import { DesignSummaryDetailsComponent } from './components/profile-final/summary-details/summary-details.component';
import { DesignSprintRolesComponent } from './components/profile-final/sprint-roles/sprint-roles.component';
import { WarningModalComponent } from './components/profile-final/modals/warning-modal/warning-modal.component';
import { PriotityWarningModalComponent } from './components/profile-final/modals/priority-warning-modal/priority-warning-modal.component';
import { SprintWarningModalComponent } from './components/profile-final/modals/sprint-warning-modal/sprint-warning-modal.component';
import { SaveModalComponent } from './components/profile-final/modals/save-modal/save-modal.component';
import { SprintChangeWarningComponent } from './components/profile-final/modals/sprint-change-warning/sprint-change-warning.component';
import { ProfileKeyComponent } from './components/profile-final/profile-key/profile-key.component';
import { ResultComponent } from './components/profile-final/result/result.component';
import { ResultTrendComponent } from './components/profile-final/result/result-trend/result-trend.component';

import { ProfileSideNavComponent } from './layout/profile-side-nav/profile-side-nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChangePictureComponent } from './components/change-picture/change-picture.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HistoryComponent } from './components/history/history.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    GeneralSettingsComponent,
    ActiveConsentComponent,
    ProfileViewingRightsComponent,
    ProfileSideNavComponent,
    ChangePasswordComponent,
    ChangePictureComponent,
    HistoryComponent,
    ProfileFinalComponent,
    DesignSummaryDetailsComponent,
    DesignSummaryComponent,
    DesignSprintRolesComponent,
    DesignResilienceComponent,
    DesignSnapshotComponent,
    DesignContactCardComponent,
    WarningModalComponent,
    PriotityWarningModalComponent,
    SprintWarningModalComponent,
    SaveModalComponent,
    SprintChangeWarningComponent,
    ProfileKeyComponent,
    ResultComponent,
    ResultTrendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatCardModule,
    NguCarouselModule,
    NgxChartsModule,
    ChartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ChangePasswordComponent],
})
export class ProfileModule {}
