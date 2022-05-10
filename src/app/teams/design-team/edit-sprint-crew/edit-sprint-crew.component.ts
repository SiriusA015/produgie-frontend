import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DesignService } from '../design.service';

@Component({
  selector: 'app-edit-sprint-crew',
  templateUrl: './edit-sprint-crew.component.html',
  styleUrls: ['./edit-sprint-crew.component.scss']
})
export class EditSprintCrewComponent implements OnInit {
  editScrewForm: FormGroup;
  submitted = false;
  id: any;
  loader = true;
  roles: any;
  teamId: string;
  sprintId: string;
  constructor(
    public dialogRef: MatDialogRef<EditSprintCrewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,
    private designService:DesignService,private configService:ConfigService,
    private toastr: ToastrService,) {
      console.log('this.data' , data)
      this.id = this.data.element.id;
    }

 
  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.sprintId = localStorage.getItem('sprint_Id');
    console.log('sprint id', this.sprintId);
    this.editScrewForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      role:['',Validators.required],

  });
this.getRoles();

  // if(this.data.element.roleId == 4){
  //   this.editScrewForm.patchValue({
  //   role:'Dotted-Line Manager',
  //   })
    
  // }
  // else if(this.data.element.roleId == 2){
  //   this.editScrewForm.patchValue({
  //     role:'Manager',
  //     })
  //     console.log('form' , this.editScrewForm.value.role)
  // }
  // else if(this.data.element.roleId == 3){
  //   this.editScrewForm.patchValue({
  //     role:'Mgr Manager',
  //     })
  // }
  // else if(this.data.element.roleId == 6){
  //   this.editScrewForm.patchValue({
  //     role:'Other',
  //     })
  // }
  // else if(this.data.element.roleId == 5){
  //   this.editScrewForm.patchValue({
  //     role:'Team',
  //     })
  // }
  // else if(this.data.element.roleId== 1){
  //   this.editScrewForm.patchValue({
  //     role:'Team Member',
  //     })
  // }
  this.editScrewForm.patchValue({
    name:this.data.element.name,
    email:this.data.element.email,
    role:this.data.element.roleId
  })

  }
  getRoles(){
    this.designService.getallCrewRoles().subscribe((res:any)=>{
      console.log('res',res);
      this.roles = res;
    })
  }
  changeToFalse(e) {
    console.log(e.target.value)
  }


  blockStartWhiteSpace(event) {
    const keyCode = event.which || event.keyCode
    if(keyCode == 32 && event.target.value == ''){
    return false;
    }
   
  } 
  onNoClick(): void {
    this.dialogRef.close('true');
  }
  onEditScrew(){
    Object.keys(this.editScrewForm.controls).forEach(field => {
      const control = this.editScrewForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    console.log('form' , this.editScrewForm.value)
        this.configService.setConfig({ isLoader: true });
        const finalPayload = this.editScrewForm.value;
        let id =this.data.element.id
        let data={
          name:finalPayload.name,
          email:finalPayload.email,
          role_id:finalPayload.role,
          is_feedback:this.data.element.isFeedback,
          is_advice_review:this.data.element.isAdviceReview,
          team_sprint_id:this.sprintId,
          team_id:this.teamId
        }
      this.designService.editSprintCrew(id,data).subscribe((res:any)=>{
        this.onNoClick();
        console.log('res',res);
        this.configService.setConfig({ isLoader: false });
       
        // this.toastr.success('Success', res.responseMsg, {
        //   timeOut: 3000,
        // });
      },error=>{
        this.onNoClick();
        console.log(error);
        
      })
      
 
    
  }
   // convenience getter for easy access to form fields
   get f() { return this.editScrewForm.controls; }
}

