import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDialogProperties,
  ) { }

  ngOnInit(): void {
  }

  proceed(): void {
    this.dialogRef.close({ proceed: true });
  }

  cancel(): void {
    this.dialogRef.close({ proceed: false });
  }
}

class ModalDialogProperties {
  message: string;
  hasCancelButton: boolean = false;
}
