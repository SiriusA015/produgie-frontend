import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ConfigService } from '../../../shared/service/config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-stakeholder',
  templateUrl: './add-stakeholder.component.html',
  styleUrls: ['./add-stakeholder.component.scss'],

})
export class AddStakeholderComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  stakeCachingData: any;
  emailRegex = "[ ]*?[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}[ ]*?";
  // constructor(private formBuilder: FormBuilder,  public configService: ConfigService, private http: HttpClient,@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<AddStakeholderComponent>) { 
  //   console.log('data' , data,data.data.action.id)
  apiData: { name: any; email: any; actionId: any; isCustom: any; };
  constructor(private formBuilder: FormBuilder,private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, public configService: ConfigService, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddStakeholderComponent>) {
    console.log('data', data)
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex) ,]],
  })
  this.getcachindData();
}
 // convenience getter for easy access to form fields
//  get f() { return this.registerForm.controls; }
//  onSubmit() {
//   this.submitted = true;

//   }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // console.log('iddd',this.data.data.description.action.id)
    if(this.data.type == 'add'){
      this.apiData = {
        name: this.registerForm.value.firstName,
        email: this.registerForm.value.email,
        actionId: this.data.data.action.id,
        isCustom: this.data.data.isCustom ? this.data.data.isCustom : false
      }
    }
    if(this.data.type == 'edit'){
      this.apiData = {
        name: this.registerForm.value.firstName,
        email: this.registerForm.value.email,
        actionId: this.data.data.description.action.id,
        isCustom: this.data.data.description.isCustom ? this.data.data.description.isCustom : false
      }
    }
   
  
    console.log('data', this.apiData)
    this.spinner.show();
    this.http.post(`${environment.baseurl}/actionstakeholder/add-sel-activity`, this.apiData).subscribe(
      (res: any) => {
        this.spinner.hide();
        console.log('ressssss', res);
       
        this.onNoClick();
      },
      (err) => {
        console.error('errorrrrr',err);
        if(err.status === 400){
          this._snackBar.open('Duplicate Stakeholders not allowed', '', {
            duration: 3000,
          });
        }
        this.spinner.hide();
      }
    )

}
onNoClick(): void {
  this.dialogRef.close();
}
getcachindData(){
  this.http
  .get(`${environment.baseurl}/development/get-cache-data?type=stakeholder`)
  // GET http://localhost:9000/development/get-cache-data?type=(sprintcrew OR nominee OR stakeholder)
  .subscribe(
    (res: any) => {
      console.log('cache',res);
      this.stakeCachingData = res.data;
      console.log('cache data',this.stakeCachingData);
    },
    (err) => console.log(err)
  );
}
  
onSelectionChange(event){
  console.log('event' , event)
  this.registerForm.patchValue({
    firstName:event.name,
    email:event.email
  })

}
onEmailChange(event){
  console.log('event' , event)
  this.registerForm.patchValue({
    firstName:event.name,
    email:event.email
  })

}
}
