import { GrowthLeaderReportComponent } from './components/growth-leader-report/growth-leader-report.component';
import { Routes } from '@angular/router';
import { GlNomineeComponent } from './components/gl-nominee/gl-nominee.component';
import { ReportHeadingGl360Component } from './modals/report-heading-gl360/report-heading-gl360.component';
export const gl360routes: Routes = [
    // {
    //   path: '',
    //   redirectTo: 'nominee'
    // },
    {
      path: 'nominee',
      component: GlNomineeComponent
    },
    {
      path: 'report',
      component: GrowthLeaderReportComponent
    }
];
