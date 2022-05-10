import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configure-sprint-strength',
  templateUrl: './configure-sprint-strength.component.html',
  styleUrls: ['./configure-sprint-strength.component.scss']
})
export class ConfigureSprintStrengthComponent implements OnInit {

  strengths = [
    { id: 1, title: 'Manage Complexity' },
    { id: 2, title: 'Develop Growth Mindset' },
    { id: 3, title: 'Build Stakeholder Relationship' },
    { id: 4, title: 'Manage Complexity' },
    { id: 5, title: 'Develop Growth Mindset' },
    { id: 6, title: 'Lead Innovation' },
    { id: 7, title: 'Develop and empower teams' },
  ];
  selectedStrength: Set<number> = new Set([]);
  constructor() { }

  ngOnInit(): void { }
  selectStrength(id: number) {
    if (this.selectedStrength.size === 3) {
      if (this.selectedStrength.has(id)) {
        this.selectedStrength.delete(id);
      }
    }
    else {
      if (this.selectedStrength.has(id)) {
        this.selectedStrength.delete(id);
      }
      else {
        this.selectedStrength.add(id);
      }
    }
  }

}
