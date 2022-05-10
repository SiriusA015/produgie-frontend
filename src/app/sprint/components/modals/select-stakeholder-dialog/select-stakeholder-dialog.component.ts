import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-stakeholder-dialog',
  templateUrl: './select-stakeholder-dialog.component.html',
  styleUrls: ['./select-stakeholder-dialog.component.scss'],
})
export class SelectStakeholderDialogComponent implements OnInit {
  selectedStakeHolder: Set<number> = new Set([]);
  constructor(
    public dialogRef: MatDialogRef<SelectStakeholderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.selectedStakeHolder = this.data.selected;
  }
  onClose(): void {
    console.log('clicked');
    this.dialogRef.close({isCancel: true});
  }
  addToSelectedStakeHolder(sh) {
    if (this.selectedStakeHolder.has(sh.id)) {
      this.selectedStakeHolder.delete(sh.id);
    } else {
      this.selectedStakeHolder.add(sh.id);
    }
  }
  addToActivityStakeholder(){
    this.dialogRef.close({isCancel: false, selected: this.selectedStakeHolder});
  }
}
