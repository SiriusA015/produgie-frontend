import { Component, OnInit } from '@angular/core';
import { TeamMemberServiceService } from '../team-member-service.service';

@Component({
  selector: 'app-team-member-viewing-rights',
  templateUrl: './team-member-viewing-rights.component.html',
  styleUrls: ['./team-member-viewing-rights.component.scss']
})
export class TeamMemberViewingRightsComponent implements OnInit {
  viewingRightsAccess: any;
  isviewRightAccess: boolean = false;
  isLoading: boolean  = false;

  constructor(private teamMemberService:TeamMemberServiceService) { }

  ngOnInit(): void {
    this.getViewDetail();
  }
  getViewDetail(){
    this.isLoading = true;
    this.teamMemberService.getViewingRightsDetails().subscribe((res:any)=>{
      console.log({res});
      this.isLoading = false;
      this.isviewRightAccess = true;
      this.viewingRightsAccess =res;
    },error=>{
      if(error.status == 400){
        this.isLoading = false;
      }
    })
  }

}
