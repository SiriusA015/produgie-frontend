import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vr-manager',
  templateUrl: './vr-manager.component.html',
  styleUrls: ['./vr-manager.component.scss']
})
export class VrManagerComponent implements OnInit {

  roles = [
    'SELECT ALL',
    'Manager',
    'Manager 2',
    'Mentor',
    'Peer 1',
    'Peer 2',
    'Peer 3',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
