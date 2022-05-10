import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sprint-on-mobile-dialog',
  templateUrl: './sprint-on-mobile-dialog.component.html',
  styleUrls: ['./sprint-on-mobile-dialog.component.scss'],
})
export class SprintOnMobileDialogComponent implements OnInit {
  isDev: Boolean = false;
  QRCode: string;
  elementType = 'url';
  url = '';
  constructor() {}

  ngOnInit(): void {
    const activeModule = localStorage.getItem('activeModule');
    const selectedTeamId = localStorage.getItem('selectedTeamId');
    if(activeModule === 'TEAM') {
      this.url = `${location.origin}?redirect=${activeModule.toLowerCase()}&id=${btoa(selectedTeamId)}`;
    } else {
      this.url = location.origin
    }

    // if (environment.simulator == true) {
    //   this.QRCode = `/assets/icons/qrcode/prod.svg`;

    // } else {
    //   this.QRCode = `/assets/icons/qrcode/dev.svg`;

    // }
  }
}
