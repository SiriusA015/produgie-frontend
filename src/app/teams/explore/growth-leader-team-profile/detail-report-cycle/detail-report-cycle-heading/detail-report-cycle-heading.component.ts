import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExploreService } from '../../../explore.service';

@Component({
  selector: 'app-detail-report-cycle-heading',
  templateUrl: './detail-report-cycle-heading.component.html',
  styleUrls: ['./detail-report-cycle-heading.component.scss']
})
export class DetailReportCycleHeadingComponent implements OnInit {
  isLoading: boolean;
  profileData: any;
  High: any;
  recom_cycle: any;
  isFirefox: boolean = false;
  isReportAnabled = false;
  styleName: any;
  @Output() isReportDownload: EventEmitter<boolean> = new EventEmitter();
  fCapabilities: any[];
  triggerData: any;
  capEnergise: any[];
  capPerform: any[];
  capTransform: any[];
  teamId: string = localStorage.getItem('selectedTeamId') || null;
  description: any;
  teamName: string;

  constructor(private exploreService: ExploreService) { }

  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.teamName = document.getElementById('selected-team').textContent;
  }

  downloadReport() {
    document.getElementById('download').innerHTML = 'Downloading...';
    this.isReportDownload.emit(true);
  }

  CycleView() {
    this.isLoading = true;
    this.exploreService.getIndiviual().subscribe((res: any) => {
      this.profileData = res;
      this.isLoading = false;
    })

    this.exploreService.getcycleDescription().subscribe((res: any) => {
      this.description = res
      // this.High = res.roleDescription.filter(p => p.anchor == 'high');
      // // console.log(this.High,"high");
      // this.recom_cycle = res.roleDescription.filter(p => p.team_role == 'External' || p.team_role == 'Relationship')
    })

  }

}
