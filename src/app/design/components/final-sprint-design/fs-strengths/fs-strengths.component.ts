import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fs-strengths',
  templateUrl: './fs-strengths.component.html',
  styleUrls: ['./fs-strengths.component.scss']
})
export class FsStrengthsComponent implements OnInit {
  strengths = [
    { id: 1, title: 'Manage Complexity' },
    { id: 2, title: 'Develop Growth Mindset' },
    { id: 3, title: 'Build Stakeholder Relationship' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
