import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/ui/layout/header/header.component';

@Component({
  selector: 'app-sprint-congratulation-dialog',
  templateUrl: './sprint-congratulation-dialog.component.html',
  styleUrls: ['./sprint-congratulation-dialog.component.scss']
})
export class SprintCongratulationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,private router: Router,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/sprint/dashboard']);
    
    
  }

}
