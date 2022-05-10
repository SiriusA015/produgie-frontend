import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-crew-dialog',
  templateUrl: './select-crew-dialog.component.html',
  styleUrls: ['./select-crew-dialog.component.scss']
})
export class SelectCrewDialogComponent implements OnInit {
  selectedCrew: Set<number> = new Set([]);
  constructor(
    public dialogRef: MatDialogRef<SelectCrewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.selectedCrew = this.data.selected;
  }
  onClose(): void {
    console.log('clicked');
    this.dialogRef.close({isCancel: true});
  }
  addToSelectedCrew(crew) {
    if (this.selectedCrew.has(crew.id)) {
      this.selectedCrew.delete(crew.id);
    } else {
      this.selectedCrew.add(crew.id);
    }
  }
  addToActivityCrew(){
    this.dialogRef.close({isCancel: false, selected: this.selectedCrew});
  }

}
