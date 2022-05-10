import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExploreService } from '../../../explore.service';

@Component({
  selector: 'app-detail-report-gla-heading',
  templateUrl: './detail-report-gla-heading.component.html',
  styleUrls: ['./detail-report-gla-heading.component.scss']
})
export class DetailReportGlaHeadingComponent implements OnInit {

  isFirefox: boolean = false;
  isReportAnabled = false;
  styleName:any;
  @Output() isReportDownload: EventEmitter<boolean> = new EventEmitter(); 
  fCapabilities: any[];
  triggerData: any;
  capEnergise: any[];
  capPerform: any[];
  capTransform: any[];
  isLoading:boolean = false;
  teamId:string =  localStorage.getItem('selectedTeamId') || null;
  capabilities: any;
  glaCapTransform: any[];
  glaCapEnergise: any[];
  glaCapPerform: any[];
  teamName:string;
  defaultIcons = {
    "Shape External Focus & Alignment": "cap_9",
    "Develop & Empower Talent": "cap_5",
    "Set Vision And Inspire Action": "cap_4",
    "Build Stakeholder Relationships": "cap_6",
    "Structure & Execute Growth Plans": "cap_1",
    "Develop Growth Mindset": "cap_7",
    "Manage Complexity": "cap_2",
    "Build Resilience": "cap_3",
    "Lead Innovation": "cap_8",
  };

  constructor(private exploreService: ExploreService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    this.teamId = localStorage.getItem('selectedTeamId');
    this.teamName = document.getElementById('selected-team').textContent;

    this.getGlaCapabilities();

    /* check browser  */
    if(navigator.userAgent.indexOf("Firefox") != -1) {
      this.isFirefox = true;
    }
  }

  downloadReport() {
    document.getElementById('download').innerHTML = 'Downloading...';
    this.isReportDownload.emit(true);
  }

  getGlaCapabilities() {
    this.isLoading = true;
    this.exploreService.GetDonutDetails().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.isReportAnabled = true;
        if (res) {
          this.capabilities = res.map((record, index) => {
            return {
              ...record,
              strategy: Math.round(record.strategyScore),
              style: Math.round(record.styleScore),
              icon: this.defaultIcons[record.capabilityName],
              rank: index + 1
            }
          });
        }

        this.glaCapEnergise = this.capabilities.filter(
          (o) => o.capabilityType.toLowerCase() === 'energize'
        );
        this.glaCapPerform = this.capabilities.filter(
          (o) => o.capabilityType.toLowerCase() === 'perform'
        );
        this.glaCapTransform = this.capabilities.filter(
          (o) => o.capabilityType.toLowerCase() === 'transform'
        );
        this.fCapabilities = [...this.glaCapPerform, ...this.glaCapTransform, ...this.glaCapEnergise];
      }, errors => {
        this.isLoading = false;
        this.isReportAnabled = true;
        if (errors?.error.statusCode == 404) {
          this.capabilities = [];
          this.fCapabilities = [];
          this.glaCapPerform = [];
          this.glaCapTransform = [];
          this.glaCapEnergise = [];
          this.toastr.info('Info', errors?.error?.errorMessage, {
            timeOut: 3000,
          });

        } else {
          this.toastr.error('Error', errors?.error?.errorMessage, {
            timeOut: 3000,
          });
        }
        console.log(errors);
      }
    );
  }

}
