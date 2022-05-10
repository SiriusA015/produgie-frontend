import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {
  QRCode: string;
  url:string = '';
  elementType = 'url';
  constructor() { }

  ngOnInit(): void {
    
    this.url = location.origin
    
    // if (environment.simulator == true) {
    //   this.QRCode = `/assets/icons/qrcode/prod.svg`;

    // } else {
    //   this.QRCode = `/assets/icons/qrcode/dev.svg`;

    // }

  }

}
