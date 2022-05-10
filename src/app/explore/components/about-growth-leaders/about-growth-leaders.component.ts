import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DetailedReportDialogComponent } from '../modals/detailed-report-dialog/detailed-report-dialog.component';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';

@Component({
  selector: 'app-about-growth-leaders',
  templateUrl: './about-growth-leaders.component.html',
  styleUrls: ['./about-growth-leaders.component.scss'],
})
export class AboutGrowthLeadersComponent implements OnInit {
  triggerData: any;
  isStyleDone: any;
  isStrategyDone: any;
  isStyleComplete: any;
  isStrategyComplete: any;
  reportGenerated: any;
  jobroleAdded: boolean;
  data: any;
  selectedIndex: number;
  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private configService: ConfigService,
    private dataCheck: DataCheckService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation()?.extras?.state?.example == true) {
      this.data = this.router.getCurrentNavigation()?.extras?.state?.example;
      this.selectedIndex = 1;
    } else if (
      this.router.getCurrentNavigation()?.extras?.state?.example == false
    ) {
      this.selectedIndex = 0;
    }
  }

  ngOnInit(): void {
    this.getAssessmentTrigger();
    this.activatedRoute.queryParams.subscribe(params => {
      const gl360Active = params['gl360Active'];

      if(gl360Active == 'true') {
        this.selectedIndex = 1;
      }
    });
  }
  goToReport() {
    this.router.navigate(['/explore/mysnapshot']);
  }

  getAssessmentTrigger() {
    this.configService.setConfig({ isLoader: true });
    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
        }
        this.triggerData = res.data;
        // this.reportGenerated = this.triggerData.reportGenerated;
        this.reportGenerated = true;
        // this.configService.setConfig({ isLoader: false });
      },
      (err) => console.error(err)
    );
  }
  getJobs() {
    throw new Error('Method not implemented.');
  }
  onTabChanged(event) {
    this.selectedIndex = event.index;
  }
}
