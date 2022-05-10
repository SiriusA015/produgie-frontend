import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { SprintReviewEventDialogComponent } from '../modals/sprint-review-event-dialog/sprint-review-event-dialog.component';

@Component({
  selector: 'app-sprint-congratulations',
  templateUrl: './sprint-congratulations.component.html',
  styleUrls: ['./sprint-congratulations.component.scss']
})
export class SprintCongratulationsComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  openReviewDialog(){
    const dialogRef = this.dialog.open(SprintReviewEventDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      data: {},
      panelClass: 'custom-dialog-container',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isAdded) {
        this.router.navigate(['sprint/dashboard']);
      }
    });
  }

}
