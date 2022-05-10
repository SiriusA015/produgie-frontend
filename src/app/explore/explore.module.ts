import { UiModule } from './../ui/ui.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { exploreRoutes } from './explore.routes';
import { AboutGrowthLeadersComponent } from './components/about-growth-leaders/about-growth-leaders.component';
import { MySnapshotComponent } from './components/my-snapshot/my-snapshot.component';
import { ImpactSessionComponent } from './components/impact-session/impact-session.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { SnapshotCircleComponent } from './components/my-snapshot/snapshot-circle/snapshot-circle.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SnapshotBoxComponent } from './components/my-snapshot/snapshot-box/snapshot-box.component';
import { FocusAreaDetailsComponent } from './components/my-snapshot/modals/focus-area-details/focus-area-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';
import { DetailedReportDialogComponent } from './components/modals/detailed-report-dialog/detailed-report-dialog.component';
import { DetailedReportComponent } from './components/modals/detailed-report/detailed-report.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DetailedReportHeadingComponent } from './components/modals/detailed-report-heading/detailed-report-heading.component';
import { DetailedReportFooterComponent } from './components/modals/detailed-report-footer/detailed-report-footer.component';
import { SelectJobRoleDialogComponent } from './components/modals/select-job-role-dialog/select-job-role-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { ConfirmationDialogComponent } from './components/modals/confirmation-dialog/confirmation-dialog.component';
import { NgxPrintModule } from 'ngx-print';
import { Gl360Module } from '../gl360/gl360.module';

@NgModule({
  declarations: [
    AboutMeComponent,
    SidebarComponent,
    AboutGrowthLeadersComponent,
    MySnapshotComponent,
    ImpactSessionComponent,
    SnapshotCircleComponent,
    SnapshotBoxComponent,
    FocusAreaDetailsComponent,
    DetailedReportDialogComponent,
    DetailedReportComponent,
    DetailedReportHeadingComponent,
    DetailedReportFooterComponent,
    SelectJobRoleDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(exploreRoutes),
    UiModule,
    MatIconModule,
    SharedModule,
    MatTooltipModule,
    MatRadioModule,
    MatGridListModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    NgxPrintModule,
    Gl360Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
})
export class ExploreModule { }
