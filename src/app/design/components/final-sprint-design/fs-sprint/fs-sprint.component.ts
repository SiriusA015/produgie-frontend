import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fs-sprint',
  templateUrl: './fs-sprint.component.html',
  styleUrls: ['./fs-sprint.component.scss'],
})
export class FsSprintComponent implements OnInit {
  ChosenSprint = {
    id: 3,
    icon: 'action_1',
    iconclass: 'mat-icon-purple',
    text: 'Improve executive presence and credibility with all audiences',
  };
  ChosenActions = [
    {
      id: 3,
      icon: 'action_1',
      iconclass: 'mat-icon-purple',
      text: 'Plan & deliver short presentation and messages to answer stakeholder questions (avoid too much detail in main presentation)',
      avatar: '/assets/icons/user-1.svg'
    },
    {
      id: 2,
      icon: 'action_2',
      iconclass: 'mat-icon-purple',
      text: 'Ask someone to tape your presentation and provide feedback so that you can refine your skills',
      avatar: '/assets/icons/user-2.svg'
    },
    {
      id: 1,
      icon: 'action_3',
      iconclass: 'mat-icon-yellow',
      text: 'Improve impact in meetings by speaking up and influencing others',
      avatar: '/assets/icons/user-1.svg'
    },
  ];
  RecommendedBehaviours = [
    {
      id: 3,
      icon: 'action_1',
      iconclass: 'mat-icon-purple',
      text: 'Plan & deliver short presentation and messages to answer stakeholder questions (avoid too much detail in main presentation)',
    },
    {
      id: 2,
      icon: 'action_2',
      iconclass: 'mat-icon-purple',
      text: 'Ask someone to tape your presentation and provide feedback so that you can refine your skills',
    },
    {
      id: 1,
      icon: 'action_3',
      iconclass: 'mat-icon-yellow',
      text: 'Improve impact in meetings by speaking up and influencing others',
    },
  ];
  RecomndedOutcome = {
    id: 3,
    icon: 'action_1',
    iconclass: 'mat-icon-purple',
    text: 'Improve executive presence and credibility with all audiences',
  };
  Frequency = {
    id: 3,
    day: 21
  };
  constructor() {}

  ngOnInit(): void {}
  numberArray(day: number){
    return new Array(day);
  }
}
