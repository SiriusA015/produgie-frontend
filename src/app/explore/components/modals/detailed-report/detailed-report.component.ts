import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss']
})
export class DetailedReportComponent implements OnInit {
  @Input() strategy: any;
  @Input() style: any;
  @Input() label: any;
  @Input() description: any;
  @Input() index: number;
  @Input() capType: string;
  score = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit(): void {
  }
  

}
