import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamdevelopmentService } from '../../teamdevelopment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-advice-dialog-form',
  templateUrl: './team-advice-dialog-form.component.html',
  styleUrls: ['./team-advice-dialog-form.component.scss']
})
export class TeamAdviceDialogFormComponent implements OnInit {
  isLoading = false;
  isEdit: false;
  uuid: any;
  advice: any;
  adviceForm = new FormGroup({
    text: new FormControl(null, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<TeamAdviceDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private toastr: ToastrService,
    private teamDevService: TeamdevelopmentService,
    private httpBackend: HttpBackend
  ) {
    this.http = new HttpClient(httpBackend);
  }

  placeholderText =
    'Please review the Development Plan and share your Advice on how to make the current Sprint successful.';

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.advice = this.data?.advice?.advice;
    if (this.isEdit) {
      this.adviceForm.get('text').setValue(this.advice);
    }
  }

  saveAdvice() {
    if (this.adviceForm.valid) {
      this.isLoading = true;
      this.advice = this.adviceForm.value.text
      const payload = {
        "advice": this.advice,
        "uuid": this.data.uuid
      };
      this.teamDevService.addAdvice(payload)
        .subscribe(
          (res: any) => {
            this.isLoading = false;
            this.dialogRef.close({
              isCancel: false,
              advice: payload,
              stored: false,
            });
            this.toastr.success('success', res.message, {
              timeOut: 3000,
            });
          },
          (err) => {
            this.toastr.error('error', err.error.errorMessage, {
              timeOut: 3000,
            });
            this.isLoading = false;
          });
    }
  }

  storeAdvice() {
    if (this.adviceForm.valid) {
      this.isLoading = true;
      const payload = {
        "advice": this.adviceForm.value.text,
        "uuid": this.data.uuid,
      };
      this.teamDevService.UpdateAdvice(payload)
        .subscribe(
          (res: any) => {
            this.isLoading = false;
            this.dialogRef.close({
              isCancel: false,
              advice: payload,
              stored: true,
            });
            this.toastr.success('success', res.message, {
              timeOut: 3000,
            });
          },
          (err: any) => {
            this.toastr.error('error', err.error.errorMessage, {
              timeOut: 3000,
            });
            this.isLoading = true;
          });
    }
  }

}