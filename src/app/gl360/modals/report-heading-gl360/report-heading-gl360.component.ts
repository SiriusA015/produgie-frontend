import { HttpClient } from '@angular/common/http';
import { EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RankService } from 'src/app/explore/service/rank.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { environment } from 'src/environments/environment';
import { GrowthLeaderCircleComponent } from '../../components/growth-leader-circle/growth-leader-circle.component';

@Component({
  selector: 'app-report-heading-gl360',
  templateUrl: './report-heading-gl360.component.html',
  styleUrls: ['./report-heading-gl360.component.scss'],
})
export class ReportHeadingGl360Component implements OnInit {
  @ViewChild(GrowthLeaderCircleComponent)
  snapCircle: GrowthLeaderCircleComponent;
  username: string;
  fCapabilities: any[];
  reportGenerated = false;
  triggerData: any;
  capEnergise: any[];
  capPerform: any[];
  capTransform: any[];
  capabilities = [];
  @Output() isReportDownload: EventEmitter<boolean> = new EventEmitter();  
  useExistingCss:boolean = true;
  styleName:any;
  isReportAnabled: boolean = false;
  gla360ReportGenerated: any;


  constructor(
    public rankService: RankService,
    private configService: ConfigService,
    private http: HttpClient,
    private matDialog: MatDialog,
    private dataCheck: DataCheckService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('userName');
    // this.getCapWithRank();

    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
        }
        this.triggerData = res.data;
        this.gla360ReportGenerated = this.triggerData.gla360ReportGenerated;
        if (this.gla360ReportGenerated) {
          this.getCapWithRank();
          // this.getRecommendedFad();
          // this.getJobs();
        }
      },
      (err) => {
        console.error(err);
      }
    );
     /*  for print */
     if (environment.production) {
      this.useExistingCss = false;
      const elements = document.getElementsByTagName('link');
      for (let index = 0; index < elements.length; index++) {
        if (elements[index].href.startsWith(document.baseURI)) {
          this.styleName += elements[index].href + ',';
        }
      }
      this.styleName = this.styleName.slice(0, -1);
    }
  }
  getCapWithRank() {
    this.http
      .get(`${environment.baseurl}/nomineeresponsescore/capability-rank`)
      .subscribe(
        (res: any) => {
          this.capabilities = res.data;
          this.capEnergise = this.capabilities.filter(
            (o) => o.capability.capabilityType.toLowerCase() === 'energize'
          );
          this.capPerform = this.capabilities.filter(
            (o) => o.capability.capabilityType.toLowerCase() === 'perform'
          );
          this.capTransform = this.capabilities.filter(
            (o) => o.capability.capabilityType.toLowerCase() === 'transform'
          );
          this.fCapabilities = [
            ...this.capPerform,
            ...this.capTransform,
            ...this.capEnergise,
          ];
          setTimeout(()=>{
            this.isReportAnabled = true;
          },2000);   
        },
        (err) => console.log(err)
      );
  }


  downloadReport() {
    document.getElementById('download').innerHTML = 'Downloading...';
    this.isReportDownload.emit(true);
  }

}
