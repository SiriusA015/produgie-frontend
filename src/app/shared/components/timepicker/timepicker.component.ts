import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
})
export class TimepickerComponent implements OnInit, OnChanges {
  // tslint:disable-next-line:max-line-length
  minutes = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
  ];
  hours = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  minute = '00';
  hour = '01';
  ampm = 'AM';
  @Input() defaultTime;
  @Output() timeChanged: EventEmitter<string> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {
    const ampmSplit = this.defaultTime.split(' ');
    const timeSplit = ampmSplit[0].split(':');
    this.hour = timeSplit[0];
    this.minute = timeSplit[1];
    this.ampm = ampmSplit[1];
  }
  ngOnChanges(): void {
    const ampmSplit = this.defaultTime.split(' ');
    const timeSplit = ampmSplit[0].split(':');
    this.hour = timeSplit[0];
    this.minute = timeSplit[1];
    this.ampm = ampmSplit[1];
  }
  onHourChange(event) {
    this.hour = event.target.value;
    this.timeChanged.emit(this.hour + ':' + this.minute + ' ' + this.ampm);
  }
  onMinuteChange(event) {
    this.minute = event.target.value;
    this.timeChanged.emit(this.hour + ':' + this.minute + ' ' + this.ampm);
  }

  onAmPmChange(event) {
    this.ampm = event.target.value;
    this.timeChanged.emit(this.hour + ':' + this.minute + ' ' + this.ampm);
  }
}
