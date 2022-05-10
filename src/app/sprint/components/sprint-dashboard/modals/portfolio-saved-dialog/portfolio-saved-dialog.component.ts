import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlankUiLayoutComponent } from 'src/app/ui/layout/blank-ui-layout/blank-ui-layout.component';

@Component({
  selector: 'app-portfolio-saved-dialog',
  templateUrl: './portfolio-saved-dialog.component.html',
  styleUrls: ['./portfolio-saved-dialog.component.scss']
})
export class PortfolioSavedDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BlankUiLayoutComponent>,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close("next");
  }

  onClose(): void {
    this.dialogRef.close("close");
  }

}
