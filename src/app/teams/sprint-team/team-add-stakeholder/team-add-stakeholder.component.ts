import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { SprintServiceService } from '../sprint-service.service';

@Component({
  selector: 'app-team-add-stakeholder',
  templateUrl: './team-add-stakeholder.component.html',
  styleUrls: ['./team-add-stakeholder.component.scss']
})
export class TeamAddStakeholderComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  stakeCachingData: any;
  apiData: {  };
  constructor(private formBuilder: FormBuilder,private sprintService: SprintServiceService,private _snackBar: MatSnackBar, private spinner: NgxSpinnerService,@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TeamAddStakeholderComponent>) {
    console.log('data', data)
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  })
  
}

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // console.log('iddd',this.data.data.description.action.id)
  
      this.apiData = {
        name: this.registerForm.value.firstName,
        email: this.registerForm.value.email,
        selected_action_id: this.data.data,
        isCustom:this.data.isCustom
      }
    
   this.sprintService.addStakeholder(this.apiData).subscribe((res:any)=>{
    console.log(res);
    this.dialogRef.close();
   },error=>{

   })
  
    console.log('data', this.apiData)
    this.spinner.show();
    return;
    

}
onNoClick(): void {
  this.dialogRef.close();
}

}
