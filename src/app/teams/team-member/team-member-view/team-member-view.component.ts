import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import{TeamMemberServiceService} from '../../../teams/team-member/team-member-service.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-team-member-view',
  templateUrl: './team-member-view.component.html',
  styleUrls: ['./team-member-view.component.scss']
})
export class TeamMemberViewComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  teamDetails: any;
  isteamMemberData: boolean =false;
  isLoading = false;
  subscription: Subscription;

  constructor(private teamMemberService:TeamMemberServiceService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getTeamMemberDetail();
    });

    this.getTeamMemberDetail()
  }
  getTeamMemberDetail(){
    this.isLoading = true;
    this.teamMemberService.getTeamDetails().subscribe((res:any)=>{
      this.isLoading = false;
      this.teamDetails = res;
      if(this.teamDetails.length != 0){
        this.isteamMemberData=true;
      }
      else{
        this.isteamMemberData = false;
      }
    },error=>{
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
