import { Component, OnInit } from '@angular/core';
import { IDevelopment } from '../../focus-development/focus-development.component';

@Component({
  selector: 'app-fs-focus',
  templateUrl: './fs-focus.component.html',
  styleUrls: ['./fs-focus.component.scss']
})
export class FsFocusComponent implements OnInit {

  selected: IDevelopment[] = [
    {id: 1, value: 'Build resilience', type: 'roleDemand'},
    {id: 6, value: 'Build stakeholder relationships', type: 'lowestScoring'},
    {id: 2, value: 'Set vision & inspire action', type: 'roleDemand'}
  ];

  selectedDevelopment = 6;

  constructor() { }

  ngOnInit(): void {
  }

}
