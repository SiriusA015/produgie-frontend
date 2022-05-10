import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-advice-form',
  templateUrl: './advice-form.component.html',
  styleUrls: ['./advice-form.component.scss'],
})
export class AdviceFormComponent implements OnInit {
  isLoading = false;
  isEdit: false;
  advice: any = {};
  adviceForm = new FormGroup({
    text: new FormControl(null, Validators.required),
  });
  submitted : boolean = false;
  placeholderText =
    'Please review the Development Plan and share your Advice on how to make the current Sprint successful.';
  constructor(
    public dialogRef: MatDialogRef<AdviceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private httpBackend: HttpBackend
    ) { 
      this.http = new HttpClient(httpBackend);
    }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.advice = this.data.advice;
    if (this.isEdit) {
      this.adviceForm.get('text').setValue(this.advice.text);
    }
  }

  get f(){
    return this.adviceForm.controls;
  }
  saveAdvice() {
    const uuid = this.data.uuid;
    const token = this.data.token;
    if (this.adviceForm.valid) {
    this.isLoading = true;
    const payload = this.adviceForm.value;
    this.http
      .post(`${environment.baseurl}/useradvice/save`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          uuid: `${uuid}`,
        },
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.isLoading = false;
          this.dialogRef.close({
            isCancel: false,
            advice: payload,
            stored: false,
          });
        },
        (err) => {
          console.error(err);
          this.isLoading = false;
        }
      );
    }
    
  }
  storeAdvice() {
    this.submitted = true;
    const uuid = this.data.uuid;
    const token = this.data.token;
    console.log(uuid, token);
    if (this.adviceForm.valid) {
      this.isLoading = true;
      const payload = this.adviceForm.value;
      console.log(payload);
      this.http
        .post(`${environment.baseurl}/useradvice/publish`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            uuid: `${uuid}`,
          },
        })
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.dialogRef.close({
              isCancel: false,
              advice: payload,
              stored: true,
            });
          },
          (err) => {
            console.error(err);
            this.isLoading = true;
          }
        );
    }
  }
}
