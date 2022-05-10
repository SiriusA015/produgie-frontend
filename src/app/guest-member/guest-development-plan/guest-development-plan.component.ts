import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { DesignService } from 'src/app/teams/design-team/design.service';

@Component({
  selector: 'app-guest-development-plan',
  templateUrl: './guest-development-plan.component.html',
  styleUrls: ['./guest-development-plan.component.scss']
})

export class GuestDevelopmentPlanComponent implements OnInit {
  teamId: any;
  crewMember = [];
  fadArray = []
  capabilities: any;
  sprintId: number;
  alloutcome: any;
  allbehavior: any;
  allaction: any;
  userSprint: any;
  priority: any[];
  feedback = {};
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
  design = "design";

  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    public designService: DesignService,
    private httpBackend: HttpBackend) {
    this.http = new HttpClient(httpBackend);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamId = params.id;
    });
    this.getDevplanData();
  }

  getDevplanData() {
    this.designService.getGuestDetailForDevPlan(this.teamId).subscribe((res: any) => {
      {
        res.fadResponse.capabilities.map(value => { value.name = value.label })
        res.fadResponse.areas.map(value => { value.name = value.scale })
        this.fadArray = res.fadResponse.areas.concat(res.fadResponse.capabilities, res.fadResponse.roles);
        this.priority = this.fadArray.filter(p => p.isPriority == true);

        this.userSprint = res.currentSprintResponse;
        this.crewMember = res.allSprintCrewMemeber;
        this.allaction = res.fetchSelectedActionData.actionList.slice(0, 6)
        this.alloutcome = res.fetchSelectedActionData.outcomeList.slice(0, 3)
        this.allbehavior = res.fetchSelectedActionData.behaviourList.slice(0, 3)
        this.capabilities = res.capabilitiesResponses.map((record, index) => {
          return {
            ...record,
            scoreRank: Math.round(record.score),
            icon: this.defaultIcons[record.capabilityName],
            rank: index + 1
          }
        });
        this.capabilities = this.capabilities.filter(o => o.rank < 4);
      }
    });
  }

  checkEmpty(obj) {
    return _.isEmpty(obj);
  }
}