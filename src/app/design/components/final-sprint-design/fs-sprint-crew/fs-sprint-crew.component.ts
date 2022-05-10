import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fs-sprint-crew',
  templateUrl: './fs-sprint-crew.component.html',
  styleUrls: ['./fs-sprint-crew.component.scss']
})
export class FsSprintCrewComponent implements OnInit {

  screw = [
    {
      name: 'Jade',
      role: 'Self',
      avatar: '/assets/icons/user-1.svg'
    },
    {
      name: 'Lucy',
      role: 'Manager',
      avatar: '/assets/icons/user-2.svg'
    },
    {
      name: 'Yuta',
      role: 'Mentor',
    },
    {
      name: 'Eilliam',
      role: 'Coach',
      avatar: '/assets/icons/user-1.svg'
    },
    {
      name: 'Mianda',
      role: 'Dotted line manager',
      avatar: '/assets/icons/user-2.svg'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
