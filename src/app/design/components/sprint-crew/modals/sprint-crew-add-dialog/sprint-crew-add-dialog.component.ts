import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sprint-crew-add-dialog',
  templateUrl: './sprint-crew-add-dialog.component.html',
  styleUrls: ['./sprint-crew-add-dialog.component.scss']
})
export class SprintCrewAddDialogComponent implements OnInit {
  crewForm: FormGroup;
  sprintcrew: FormArray;
  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogRef: MatDialogRef<SprintCrewAddDialogComponent>) { }

  ngOnInit(): void {
    this.crewForm = this.fb.group({
      crew: this.fb.array([this.createItemRow()]),
    });
  }
  createItemRow() {
    return this.fb.group({
      name: this.fb.control(null, Validators.required),
      email: this.fb.control(null, Validators.required),
      role: this.fb.control(null, Validators.required)
    });
  }

  addItemField() {
    this.sprintcrew = this.crewForm.get('crew') as FormArray;
    this.sprintcrew.push(this.createItemRow());
  }

  removeItemField(index: number) {
    this.sprintcrew = this.crewForm.get('crew') as FormArray;

    this.sprintcrew.removeAt(index);
    if (this.sprintcrew.length === 0) {
      this.sprintcrew.push(this.createItemRow());
    }

  }
  onClose(): void {
    this.dialogRef.close();
  }
}
