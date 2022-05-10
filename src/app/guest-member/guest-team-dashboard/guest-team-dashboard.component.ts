import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/teams/team.service';

@Component({
  selector: 'app-guest-team-dashboard',
  templateUrl: './guest-team-dashboard.component.html',
  styleUrls: ['./guest-team-dashboard.component.scss']
})
export class GuestTeamDashboardComponent implements OnInit {

  error: string;
  errorDescription: string;
  apiError: any;
  apiSuccess: any;
  showErrorMessage: boolean = false;
  loading: boolean = true;
  params: any;
  data: any;

  capabilities = [];
  allActions: any[] = [];
  allOutcomes: any[] = [];
  allBehaviors: any[] = [];
  userSprint: any;
  design = 'design';
  isLoading: boolean;
  crewMemberData: any;
  feedback: []
  advice: [];
  teamSprintId: string;
  accessRights;
  isAccessChecked: boolean = false;
  activity: any;
  devPlanShared: any;
  completedSprint: any;
  crew: any;
  inclusion: any;
  teamActivityData: any;
  teamSprintData: any;

  constructor(private route: ActivatedRoute,
    private teamService: TeamService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      queries => {
        this.params = queries.team_id;
        this.loading = false;
        if (queries.error) {
          this.error = queries.error;
          this.errorDescription = queries.error_description;
        }
      });
    this.openDashboard();
  }

  openDashboard() {
    this.loading = false;
    this.teamService.getTeamDashData(this.params).subscribe((res: any) => {
      this.isLoading = false;
      // 1. Team Development Activity
      this.teamActivityData = res.userStatsList[0];
      this.devPlanShared = (Number(this.teamActivityData.devPlanShared) / Number(this.teamActivityData.total)) * 100;
      this.completedSprint = (Number(this.teamActivityData.sprintComplete) / Number(this.teamActivityData.total)) * 100;
      this.crew = (Number(this.teamActivityData.crew) / Number(this.teamActivityData.total)) * 100;

      // 2. Team Safety & Inclusion scaleResponse
      this.inclusion = res.scaleResponse;

      // 3. Team Sprint
      this.teamSprintData = res.planResponse.currentSprintResponse;

      // 4. Sprint Crew Member 
      this.crewMemberData = res.planResponse.allSprintCrewMemeber;

      // 5. Actions , Behaviours, Outcomes
      this.allActions = res.planResponse.fetchSelectedActionData.actionList;
      this.allOutcomes = res.planResponse.fetchSelectedActionData.behaviourList;
      this.allBehaviors = res.planResponse.fetchSelectedActionData.outcomeList;

      // Advice and Feedback
      this.advice = res.adviceResponses;
      this.feedback = res.feedBackResponses;
    });
  }

}
