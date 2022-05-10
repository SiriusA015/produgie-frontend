import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-report-gla',
  templateUrl: './detailed-report-gla.component.html',
  styleUrls: ['./detailed-report-gla.component.scss']
})
export class DetailedReportGlaComponent implements OnInit, OnChanges {

  @Input() strategy: any;
  @Input() style: any;
  @Input() index: number;
  @Input() capabilityType: string;
  @Input() capabilityName: string;
  strategySubscalesArr: [] = [];
  styleSubscalesArr: [] = [];
  strategySubDimensionsArr: [] = [];
  styleSubDimensionsArr: [] = [];
  score = [1, 2, 3];

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges() {
    this.strategySubscalesArr = this.strategy[0]?.sub_dimensions?.filter(o => o.sub_dimension_name == 'Decisive' || o.sub_dimension_name == 'Rational' || o.sub_dimension_name == 'Integrative');
    this.styleSubscalesArr = this.style[0]?.sub_dimensions?.filter(o => o.sub_dimension_name == 'Decisive' || o.sub_dimension_name == 'Rational' || o.sub_dimension_name == 'Integrative');
    this.strategySubDimensionsArr = this.strategy[0]?.sub_dimensions?.filter(o => o.sub_dimension_name != 'Decisive' && o.sub_dimension_name != 'Rational' && o.sub_dimension_name != 'Integrative');
    this.styleSubDimensionsArr = this.style[0]?.sub_dimensions?.filter(o => o.sub_dimension_name != 'Decisive' && o.sub_dimension_name != 'Rational' && o.sub_dimension_name != 'Integrative');
  }
}
