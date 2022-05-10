import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/service/config.service';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-teams-navbar',
  templateUrl: './teams-navbar.component.html',
  styleUrls: ['./teams-navbar.component.scss']
})
export class TeamsNavbarComponent implements OnInit {
  isTeamCreated:boolean = false;
  setectedMenu: string;
  isSettingActivated: boolean = false;
  teamInfoId: any;
  constructor(private configService: ConfigService, private route: ActivatedRoute, private teamService: TeamService, private router: Router) {
    this.route.params.subscribe(
      params => {
        this.teamInfoId = params.id;
      }
    );
   }

  ngOnInit(): void {
    // this.triggerGetTeam();
    const isTeamCreated = localStorage.getItem('isTeamCreated');
    if(isTeamCreated == 'yes'){
      this.isTeamCreated = true;
    }
    else{
      this.isTeamCreated =false;
    }
    this.setActiveTab();

  }
  setActiveTab() {
    this.setectedMenu = this.router.url;
    if(this.router.url == '/teams/team-settings') {
      this.isSettingActivated = true;
    }else{
      this.isSettingActivated = false;
    }
  
   
  }


  // triggerGetTeam() {
  //   this.configService.teamCreate.subscribe((data: any) => {
  //     if (data.teamList?.length == 0) {
  //       // this.isTeamCreated = false;
  //     }
  //   });
  // }
}


