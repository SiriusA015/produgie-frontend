import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  QRCode: string;
  url:string = '';
  elementType = 'url';
  constructor() { }

  ngOnInit(): void {

    this.url = location.origin
//     if (environment.simulator == true) {
//       this.QRCode = `/assets/icons/qrcode/prod.svg`;
// } else {
//       this.QRCode = `/assets/icons/qrcode/dev.svg`;

//     }

  }
}
