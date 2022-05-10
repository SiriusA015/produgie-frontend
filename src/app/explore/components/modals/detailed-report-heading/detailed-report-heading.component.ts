import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RankService } from 'src/app/explore/service/rank.service';
import { GrowthLeaderCircleComponent } from 'src/app/gl360/components/growth-leader-circle/growth-leader-circle.component';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detailed-report-heading',
  templateUrl: './detailed-report-heading.component.html',
  styleUrls: ['./detailed-report-heading.component.scss']
})
export class DetailedReportHeadingComponent implements OnInit {

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
  firefox:boolean = false;
  isFirefox: boolean = false;

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

    if(navigator.userAgent.indexOf("Firefox") != -1) {
      this.isFirefox = true;
    }

    // if(window.navigator.userAgent == "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0")
    // {
    //   this.firefox = true
    // }
    // else{

    //   this.firefox = false

    // }

    this.username = localStorage.getItem('userName');
    this.dataCheck.getAssessmentTrigger().subscribe(
      (res: any) => {
        if (!res.isAgree) {
          this.router.navigate(['/auth/policy-consent']);
        }
        this.triggerData = res.data;
        this.reportGenerated = this.triggerData.reportGenerated;
        if (this.reportGenerated) {
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
      .get(`${environment.baseurl}/capabilityscoredata/capability-rank`)
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
