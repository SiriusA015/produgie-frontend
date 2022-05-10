import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigService } from '../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
const baseUrl = environment.baseurl;
@Component({
  selector: 'app-edit-screw',
  templateUrl: './edit-screw.component.html',
  styleUrls: ['./edit-screw.component.scss']
})
export class EditScrewComponent implements OnInit {
  editScrewForm: FormGroup;
  submitted = false;
  id: any;
  loader = true;
  constructor(
    public dialogRef: MatDialogRef<EditScrewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private configService: ConfigService,  private http: HttpClient,) {
      console.log('this.data' , data)
      this.id = this.data.element.id;
    }

 
  ngOnInit(): void {
    this.editScrewForm = this.formBuilder.group({
      name: [''],
      email: [''],
      role:[''],
      isFastForward:[''],
      isFeedbackGoalsNBehaviour:['']

  });
  if(this.data.element.isManager == true){
    this.editScrewForm.patchValue({
    role:'manager',
    })
    
  }
  else if(this.data.element.isMentor == true){
    this.editScrewForm.patchValue({
      role:'mentor',
      })
      console.log('form' , this.editScrewForm.value.role)
  }
  else if(this.data.element.isPeerOthers == true){
    this.editScrewForm.patchValue({
      role:'peer',
      })
  }
  else if(this.data.element.isTeam == true){
    this.editScrewForm.patchValue({
      role:'team',
      })
  }
  else if(this.data.element.isCustomer == true){
    this.editScrewForm.patchValue({
      role:'customer',
      })
  }
  else if(this.data.element.isCoach == true){
    this.editScrewForm.patchValue({
      role:'coach',
      })
  }
  else{
    this.editScrewForm.patchValue({
      role:'other',
      })
  }
  this.editScrewForm.patchValue({
    name:this.data.element.name,
    email:this.data.element.email,
    isFastForward:this.data.element.isFastForward,
    isFeedbackGoalsNBehaviour:this.data.element.isFeedbackGoalsNBehaviour
  })
  console.log()
  }

  blockStartWhiteSpace(event) {
    const keyCode = event.which || event.keyCode
    if(keyCode == 32 && event.target.value == ''){
    return false;
    }
   
  }

  changeToFalse(e) {
    console.log(e.target.value)
  }
  onNoClick(): void {
    this.dialogRef.close('true');
  }
  onEditScrew(){
    console.log('form' , this.editScrewForm.value)
        this.configService.setConfig({ isLoader: true });
        const finalPayload = this.editScrewForm.value;
        this.http
          .patch(`${baseUrl}/sprintcrew/update-sprintcrew/${this.id}`, finalPayload)
          .subscribe(
            (res1: any) => {
              console.log(res1);
              if (res1.status === 200) {
                this.configService.setConfig({ isLoader: false });
                this.dialogRef.close(true);
                // if (this.message?.isEdit) {
                //   this.dataService.nextMessage({ isEdit: false });
                //   this.router.navigate(['/design/sprint-final']);
                // } else {
                //   this.router.navigate(['/design/sprint-frequency']);
                // }
              }
            },
            (err) => console.log(err)
          );
      
  
      // this.sprintcrew = this.crewForm.get('crew') as FormArray;
      // this.sprintcrew.push(this.createItemRow());
      // if (this.crewForm.valid) {
      //   this.dataService.nextMessage({ crew: true });
      // } else {
      //   this.dataService.nextMessage({ crew: false });
      // }
    
  }
}
