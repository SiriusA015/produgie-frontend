import { Component, OnInit } from '@angular/core';
import { DesignService } from '../../design-team/design.service';
import { TeamMemberServiceService } from '../team-member-service.service';

@Component({
  selector: 'app-team-member-dev-plan',
  templateUrl: './team-member-dev-plan.component.html',
  styleUrls: ['./team-member-dev-plan.component.scss']
})
export class TeamMemberDevPlanComponent implements OnInit {
  FadArray: any;
  priority: any;
  userSprint: any;
  crewMember: any;
  allaction: any;
  alloutcome: any;
  allbehavior: any;
  capabilities: any;
  isDesignCompleted: boolean = false;
  isDesignInProcess: boolean = false;
  defaultIcons = {
    "Shape External Focus & Alignment": "cap_9",
    "Develop & Empower Talent": "cap_5",
    "Set Vision And Inspire Action": "cap_4",
    "Build Stakeholder Relationships": "cap_6",
    "Structure & Execute Growth Plans": "cap_1",
    "Develop Growth Mindset": "cap_7",
    "Manage Complexity": "cap_2",
    "Build Resilience": "cap_3",
    "Lead Innovation": "cap_8",
  };

  constructor(private teamdevplanService:TeamMemberServiceService,
    private designService:DesignService
    ) { }

  ngOnInit(): void {
    this.getDesignStatus();
    this.getcap();
    this.teamdevplanService.teamDevplan().subscribe((res:any)=>{
      res.fadResponse.capabilities.map(value => { value.name = value.label})
      res.fadResponse.areas.map(value => { value.name = value.scale})
      this.FadArray = res.fadResponse.areas.concat(res.fadResponse.capabilities, res.fadResponse.roles);
      this.priority = this.FadArray.filter(p => p.isPriority == true);
      this.userSprint = res.currentSprintResponse;
      this.crewMember = res.allSprintCrewMemeber;
      this.allaction = res.fetchSelectedActionData.actionList.slice(0, 6)
      this.alloutcome = res.fetchSelectedActionData.outcomeList.slice(0, 3)
      this.allbehavior =res.fetchSelectedActionData.behaviourList.slice(0, 3);

      // this.userSprint = res.allSprintCrewMemeber;

    })
  }

  getDesignStatus() {
    this.designService.teamDesignStatus().subscribe(
      (res: any) => {
        this.isDesignCompleted = res.designCompleted;
        this.isDesignInProcess = res.designInProcess;
      });
  }

  getcap(){
    this.designService.getCapabilities().subscribe((res: any) => {
      // this.capabilities = res.filter((o) => o.score <= 2.50);
      this.capabilities = res.map((record, index) => {
        return {
          ...record,
          strategy: Math.round(record.strategyScore),
          style: Math.round(record.styleScore),
          icon: this.defaultIcons[record.capabilityName],
          rank: index + 1 
        }
      });
      this.capabilities = this.capabilities.filter(o => o.rank < 4);
    })
  }
}
