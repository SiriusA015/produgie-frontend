import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/design/service/data.service';

@Component({
  selector: 'app-sprint-change-warning',
  templateUrl: './sprint-change-warning.component.html',
  styleUrls: ['./sprint-change-warning.component.scss']
})
export class SprintChangeWarningComponent implements OnInit {

  constructor( private router: Router, private dataService: DataService, public dialogRef: MatDialogRef<SprintChangeWarningComponent>) { }

  ngOnInit(): void {
  }
  onConfirm(): void {
    this.dialogRef.close();
    this.router.navigate(['/design/sprint-configure']);
    this.router.navigateByUrl('/design/sprint-configure');
    this.dataService.nextMessage({
      isEdit: true,
      action: true,
      behaviour: true,
      crew: true,
      fad: true,
      frequency: true,
      isConfirm: false,
      outcome: true,
      sprint: true,
    });
  }
  Cancel() {
    this.dialogRef.close();
  }

}
