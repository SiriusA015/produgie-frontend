import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberServiceService {


  constructor(private http: HttpClient) { }

  getTeamDetails() {
    return this.http.get(`${environment.teamBaseUrl}/teams-member/team-details`);
  }
  getViewingRightsDetails() {
    let teamId = localStorage.getItem('selectedTeamId');
    let userId = localStorage.getItem('user_id');
    return this.http.get(`${environment.teamBaseUrl}/teams-member/viewing-rights-details?user_id=${userId}&team_id=${teamId}`);
  }

  teamDevplan(){
    let teamId = localStorage.getItem('selectedTeamId');
    // let teamId = 2467
    return this.http.get(`${environment.teamBaseUrl}/teams-member/dev-plan?team_id=${teamId}`);
  }

}
