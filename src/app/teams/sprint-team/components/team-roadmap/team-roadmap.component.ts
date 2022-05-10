import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { RoadmapViewEventComponent } from '../../roadmap-view-event/roadmap-view-event.component';
import { SprintServiceService } from '../../sprint-service.service';
import { TeamRoadmapCommentComponent } from '../../team-roadmap-comment/team-roadmap-comment.component';
import { TeamAddEventComponent } from '../team-add-event/team-add-event.component';
import { TeamViewEventComponent } from '../team-view-event/team-view-event.component';
import jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';

@Component({
  selector: 'app-team-roadmap',
  templateUrl: './team-roadmap.component.html',
  styleUrls: ['./team-roadmap.component.scss'],
})

export class TeamRoadmapComponent implements OnInit {

  panelOpenState = false;
  selectedActions: any;
  teamId: string;
  teamSprintId: string;
  inProgress: any;
  selectedActionid: any;
  completedActions: any;
  count: string;
  comments: any;
  isDesignComplete: any;
  isDesignEdit: any;
  rolesArray: any;
  role: string;
  isteamManager: boolean;
  userId: string;
  teamSprint;
  sprintStartDate;
  isSprintStarted: boolean = false;

  constructor(private configService: ConfigService,private authService: AuthService,
    private dialog:MatDialog,private sprintService: SprintServiceService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.teamSprintId = localStorage.getItem('sprint_Id');
    this.userId = localStorage.getItem('user_id');
    this.count = localStorage.getItem('commentCount');
    this.getDesignStatus();
    this.getRoles();
  }
  getRoles() {
    const accessToken = this.authService.getAccessToken();
    const decoded: any = jwt_decode(accessToken);
    const rolesArr = JSON.stringify(decoded.Groups);
    this.rolesArray = JSON.parse(rolesArr)
    console.log(' this.rolesArray ',this.rolesArray);
    if(this.rolesArray.includes('TEAM_MANAGER')){
      this.isteamManager = true;
      this.role = localStorage.getItem('Role');
    }
    if(this.role == 'TEAM_MEMBER'){
      this.isteamManager = false;
    }
 
    // this.rolesArray = this.rolesArray.map(data => {
    //   return data;
    // })
    // return JSON.stringify(decoded.Groups);

  }
  getDesignStatus() {
    this.configService.setConfig({ isLoader: true });
    this.sprintService.teamDesignStatus().subscribe((res: any) => {
      console.log(res);
      this.configService.setConfig({ isLoader: false });
      this.isDesignComplete =res.designCompleted;
      this.isDesignEdit = res.designEdit;
      if(this.isDesignComplete){
        this.getSprintData();
        this.getSelectedActionData()
        this.getDataProgress();
        this.getCompletedActions();
      }
    },error=>{
      this.configService.setConfig({ isLoader: false });

    })
  }
  getDataProgress(){
    this.sprintService.getAllProgressData( this.teamSprintId ).subscribe((res:any)=>{
      console.log(res);
      this.inProgress=res;
    },error=>{

    })
  }
  getSelectedActionData(){
    this.sprintService.roadmapTodoActions(this.teamSprintId).subscribe((res:any)=>{
      console.log(res);
      this.selectedActions= res.actionList;
    },error=>{
      
    })
  }
  getCompletedActions(){
    this.sprintService.getCompletedActions( this.teamSprintId ).subscribe((res:any)=>{
      console.log(res);
      this.completedActions=res.statusList;
    },error=>{

    })
  }
  moveToDone(data){
    console.log(data);
    
    let payload={
      team_id:this.teamId,
      selected_action_id:data.id,
      sprint_id:this.teamSprintId,
      user_id: this.userId
    }
    this.sprintService.moveToDone(payload).subscribe((res:any)=>{
      console.log(res);
      this.getSelectedActionData();
      this.getDataProgress();
      this.getCompletedActions();
    },error=>{
      this.toastr.error('error',error.error.errorMessage, {
        timeOut: 3000,
      });
    })
  }
  moveInProgress(data){
    console.log(data);
   
    let payload={
      team_id:this.teamId,
      selected_action_id:data.id,
      sprint_id:this.teamSprintId,
      user_id: this.userId
    }
    this.sprintService.moveInProgress(payload).subscribe((res:any)=>{
      console.log(res);
      this.getSelectedActionData();
      this.getDataProgress();
      this.getCompletedActions();
    },error=>{
      this.toastr.error('error',error.error.errorMessage, {
        timeOut: 3000,
      });
    })
    
  }

  openComment(data){
    console.log(data);
    
    const dialogRef = this.dialog.open(TeamRoadmapCommentComponent, {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data:data.id
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getDataProgress()
    });
  }
  viewEvent(item){
    console.log(item);
    
    const dialogRef = this.dialog.open(RoadmapViewEventComponent
      , {
      width: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      height: '100%',
      data:item.selected_action_id
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }

  getSprintData() {
    this.configService.setConfig({ isLoader: true });
    this.sprintService.getSprintData(this.teamId).subscribe((res: any) => {
     
      this.teamSprint = res;
      if (res) {        
        this.teamSprintId = localStorage.getItem('sprint_Id');
        
        const sprintStartDate = moment(res.start_date).format('DD-MM-YYYY');
        
        this.sprintStartDate = res.start_date;
        
        const today = moment().format('DD-MM-YYYY');
        if (sprintStartDate <= today) {
          this.isSprintStarted = true;
        }
      }

      this.configService.setConfig({ isLoader: false });
    }, error => {
      this.configService.setConfig({ isLoader: false });
    });
  }
}
