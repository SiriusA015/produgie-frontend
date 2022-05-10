import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sprint-selection-details',
  templateUrl: './sprint-selection-details.component.html',
  styleUrls: ['./sprint-selection-details.component.scss']
})
export class SprintSelectionDetailsComponent implements OnInit {

  @Input() frequency: any;
  @Input() sprint;
  @Input() sprintNo;
  @Input() userSprints;
  @Input() selectedUserSprint;
  @Output() selectedSprint: EventEmitter<any> = new EventEmitter();
  selected: any;
  constructor() { }

  ngOnInit(): void {
    this.selected = this.selectedUserSprint.id;
  }
  selectUserSprint(userSprintId) {
    this.selectedSprint.emit(userSprintId);
  }

}
