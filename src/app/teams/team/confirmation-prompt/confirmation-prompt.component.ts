import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-prompt',
  templateUrl: './confirmation-prompt.component.html',
  styleUrls: ['./confirmation-prompt.component.scss']
})
export class ConfirmationPromptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

}

  ngOnInit(): void {
  }
  onAdd(){
    this.dialogRef.close(true);
  }
  onDismiss(){
    this.dialogRef.close(false);
  }

}
