import { SprintChangeWarningComponent } from './../modals/sprint-change-warning/sprint-change-warning.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './../../../service/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resilience',
  templateUrl: './resilience.component.html',
  styleUrls: ['./resilience.component.scss']
})
export class DesignResilienceComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService, public dialog: MatDialog ) {}
  message: any;
  @Input() sprint;
  @Input() sprintNo;

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;
  
  ngOnInit(): void {
    this.dataService.sharedMessage.subscribe(message => this.message = message);
  }

  // getprioritiezedFad() {
  //   if (this.fads.length > 0 && this.priority) {
  //     return this.fads.filter(o => o.id === this.priority)[0];
  //   }
  //   else {
  //     return [];
  //   }
  // }

  editSprint() {
    const dialogRef = this.dialog.open(SprintChangeWarningComponent, {
      width: '30vw',
      data: {}
    });
  }

}
