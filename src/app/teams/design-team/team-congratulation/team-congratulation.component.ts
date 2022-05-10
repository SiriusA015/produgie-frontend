import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team-congratulation',
  templateUrl: './team-congratulation.component.html',
  styleUrls: ['./team-congratulation.component.scss']
})
export class TeamCongratulationComponent implements OnInit {
  QRCode: string;
  url:string = '';
  elementType = 'url';
  constructor() { }

  ngOnInit(): void {
    const activeModule = localStorage.getItem('activeModule');
    const selectedTeamId = localStorage.getItem('selectedTeamId');
    if(activeModule === 'TEAM') {
      this.url = `${location.origin}?redirect=${activeModule.toLowerCase()}&id=${btoa(selectedTeamId)}`;
    } else {
      this.url = location.origin
    }

//     if (environment.simulator == true) {
//       this.QRCode = `/assets/icons/qrcode/prod.svg`;
// } else {
//       this.QRCode = `/assets/icons/qrcode/dev.svg`;

//     }

  }

}
