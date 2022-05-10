import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DeleteSprintCrewComponent } from '../delete-sprint-crew/delete-sprint-crew.component';
import { DesignService } from '../design.service';
import { EditSprintCrewComponent } from '../edit-sprint-crew/edit-sprint-crew.component';

@Component({
  selector: 'app-team-sprint-crew',
  templateUrl: './team-sprint-crew.component.html',
  styleUrls: ['./team-sprint-crew.component.scss']
})
export class TeamSprintCrewComponent implements OnInit {
  message: any;
  allfft = false;
  allfeedback = false;
  userId = 1;
  clientId = 1;
  userSprintId;
  sprintId;
  assessmentId;
  userSprint;
  deleteIds = [];
  crewdata = [];
  crew = {
    name: localStorage.getItem('userName'),
    role: 'Self',
    image: '/assets/icons/user-1.svg',
    email: localStorage.getItem('email'),
    isFastForward: true,
    isFeedbackGoalsNBehaviour: true,
  };
  picture = 'avatar_10';
  crewForm: FormGroup;
  sprintcrew: FormArray;
  roleArray = {
    manager: 'Manager',
    mentor: 'Mentor',
    peer: 'Peer',
    team: 'Team',
    customer: 'Customer',
    coach: 'Coach',
    other: 'Other',
  };
  crews: any;
  array1: any = [];
  tableData: any = [];
  sprintCachingData: any;
  editData: { [k: string]: any };
  dataSource: any;
  roles: any;
  teamId: string;
  sprint_id: string;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    public dialog: MatDialog,
    private designService: DesignService,
    private toastr: ToastrService,
  ) {
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.editData = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit(): void {
    this.dataService.nextMessage({
      action: false,
      actionGray: true,
      behaviour: false,
      behaviourGray: true,
      crew: true,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      outcome: false,
      outcomeGray: true,
      sprint: true,
      sprintShow: false,
      routine: false,
      step: 3,
      crewEdit: false,
    });
    this.teamId = localStorage.getItem('selectedTeamId');
    this.sprintId = localStorage.getItem('sprint_Id');
    this.getRoles();
    this.crewForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      isFastForward: [true],
      isFeedbackGoalsNBehaviour: [true],
    });
    this.dataService.sharedMessage.subscribe((message) => {
      this.message = message;
    });

    this.getSelectedCrew();
  }

  ngAfterViewInit(): void {
  }

  changeToFalse(e) {
  }

  getSelectedCrew() {
    this.configService.setConfig({ isLoader: true });
    this.sprint_id = localStorage.getItem('sprint_Id')
    this.designService.getCrewMember(this.sprint_id).subscribe(
      (res2: any) => {
        this.dataSource = res2;
        this.tableData = res2;
        this.crewdata[0] = this.crew;
        this.configService.setConfig({ isLoader: false });
      },
      (err2) => {
        this.configService.setConfig({ isLoader: false });
      }
    );
  }
 
  getRoles() {
    this.designService.getallCrewRoles().subscribe((res: any) => {
      this.roles = res;
      this.roles = this.roles.filter(data => data.id != 1);
    })
  }
  addItemField() {
    Object.keys(this.crewForm.controls).forEach(field => {
      const control = this.crewForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.crewForm.valid) {
      this.configService.setConfig({ isLoader: true });
      const finalPayload = this.crewForm.value;
      let data = {
        name: finalPayload.name,
        email: finalPayload.email,
        role_id: finalPayload.role,
        is_feedback: finalPayload.isFastForward,
        is_advice_review: finalPayload.isFeedbackGoalsNBehaviour,
        team_sprint_id: this.sprintId,
        team_id: this.teamId
      }
      this.designService.addSprintCrew(data)
        .subscribe(
          (res1: any) => {
            this.configService.setConfig({ isLoader: false });
            this.crewForm.reset();
            this.getSelectedCrew();
          },
          (err) => {
            this.toastr.error('Error', err.error.errorMessage, {
              timeOut: 3000,
            });
            this.configService.setConfig({ isLoader: false });
          }
        );
    }
  }
  
  onSelectionChange(event) {
    this.crewForm.patchValue({
      email: event.email,
      name: event.name,
    });
  }
  onEmailChange(event) {
    this.crewForm.patchValue({
      email: event.email,
      name: event.name,
    });
  }
  storeCrew() {
    this.configService.setConfig({ isLoader: true });
    this.designService.getTeamSprint().subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      if (this.message?.isEdit) {
        this.router.navigate(['/teams/design/dev-plan']);


      } else {
        this.router.navigate(['/teams/design/teams-sprint-frquency']);

      }
    }, error => {
      this.configService.setConfig({ isLoader: false });
    })


  }
  sendAdvice(data,event){
    this.configService.setConfig({ isLoader: true });
    data.isAdviceReview = event.target.checked;
    let payload={
      name:data.name,
      email:data.email,
      role_id:data.roleId,
      is_feedback:data.isFeedback,
      is_advice_review: data.isAdviceReview,
      team_sprint_id:this.sprintId,
      team_id:this.teamId
    }
  this.designService.editSprintCrew(data.id,payload).subscribe((res:any)=>{
    this.configService.setConfig({ isLoader: false });
    this.getSelectedCrew();
    this.toastr.success('Success', 'Advice & Review Updated Successfully !', {
      timeOut: 3000,
    });
  },error=>{
    this.getSelectedCrew();
    this.configService.setConfig({ isLoader: false });
    this.toastr.error('Error', error.statusText, {
      timeOut: 3000,
    });
    
  })
  }
  sendFeedback(data,event){
    this.configService.setConfig({ isLoader: true });
    data.isFeedback = event.target.checked;
    let payload={
      name:data.name,
      email:data.email,
      role_id:data.roleId,
      is_feedback:data.isFeedback,
      is_advice_review: data.isAdviceReview,
      team_sprint_id:this.sprintId,
      team_id:this.teamId
    }
  this.designService.editSprintCrew(data.id,payload).subscribe((res:any)=>{
    this.configService.setConfig({ isLoader: false });
    this.getSelectedCrew();
    this.toastr.success('Success', 'Feedback Updated Successfully !', {
      timeOut: 3000,
    });
  },error=>{
    this.getSelectedCrew();
    this.configService.setConfig({ isLoader: false });
    this.toastr.error('Error', error.statusText, {
      timeOut: 3000,
    });
    
  })
  }


  editCrew(element) {
    const dialogRef = this.dialog.open(EditSprintCrewComponent, {
      width: '500px',
      data: { element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getSelectedCrew();

    });
  }
  deleteCrew(element) {
    const dialogRef = this.dialog.open(DeleteSprintCrewComponent, {
      width: '500px',
      data: { element, type: 'design' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getSelectedCrew();
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.crewForm.controls; }
}

