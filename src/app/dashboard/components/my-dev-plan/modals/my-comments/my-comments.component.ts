import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.scss']
})
export class MyCommentsComponent implements OnInit {
  comments = [];
  selectedDate = 'All';
  constructor(public dialogRef: MatDialogRef<MyCommentsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.comments = this.data;
  }

}
