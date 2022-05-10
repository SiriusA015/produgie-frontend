import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-advice',
  templateUrl: './my-advice.component.html',
  styleUrls: ['./my-advice.component.scss']
})
export class MyAdviceComponent implements OnInit {
  advice = [];
  constructor(public dialogRef: MatDialogRef<MyAdviceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.advice = this.data;
  }
}
