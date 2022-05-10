import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-detail-report-team-profile-heading',
  templateUrl: './detail-report-team-profile-heading.component.html',
  styleUrls: ['./detail-report-team-profile-heading.component.scss']
})
export class DetailReportTeamProfileHeadingComponent implements OnInit {

  isFirefox: boolean = false;
  isReportAnabled = false;
  styleName: any;
  @Output() isReportDownload: EventEmitter<boolean> = new EventEmitter();
  triggerData: any;
  isLoading: boolean = false;
  teamId: string = localStorage.getItem('selectedTeamId') || null;
  teamName: string;

  constructor() { }

  ngOnInit(): void {
    this.isReportAnabled = true;
    this.teamId = localStorage.getItem('selectedTeamId');
    this.teamName = document.getElementById('selected-team').textContent;
    /* check browser  */
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      this.isFirefox = true;
    }
  }

  downloadReport() {
    document.getElementById('download').innerHTML = 'Downloading...';
    this.isReportDownload.emit(true);
  }

}