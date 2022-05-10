import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ConfigService } from '../../../shared/service/config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../service/data.service';
import { Action } from 'src/models/Action';
@Component({
  selector: 'app-stakeholder',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.scss']
})
export class StakeholderComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  stakeCachingData: any;
  emailRegex = "[ ]*?[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}[ ]*?";

  constructor(private formBuilder: FormBuilder,private dataService: DataService,private _snackBar: MatSnackBar, private spinner: NgxSpinnerService, public configService: ConfigService, private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<StakeholderComponent>) {
    console.log('data', data)
  }
  

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
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
    // alert('hi')
    console.log('register' , this.registerForm.value)
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.dialogRef.close({data:this.registerForm.value,isCustom:false})
}

onNoClick(): void {
  this.dialogRef.close();
}

blockStartWhiteSpace(event) {
  const keyCode = event.which || event.keyCode
  if(keyCode == 32 && event.target.value == ''){
  return false;
  }
 
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
    name:event.name,
    email:event.email
  })

}
onEmailChange(event){
  console.log('event' , event)
  this.registerForm.patchValue({
    name:event.name,
    email:event.email
  })

}
}


