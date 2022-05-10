import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../auth/Role';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamId: string;

  constructor(private http: HttpClient) {
    const activeRole = localStorage.getItem('Role')
    
    if(activeRole == Role.TEAM_MEMBER){
     this.teamId = localStorage.getItem('membertid')
    } else {
      this.teamId = localStorage.getItem('selectedTeamId')
    }
   }

  createTeam(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/createTeam`, data);
  }

  getTeam(id) {
    return this.http.get(`${environment.teamBaseUrl}/teams/getMembers/${id}`);
  }

  searchTeamMember(id, name) {
    return this.http.get(`${environment.teamBaseUrl}/users/team/searchMember?keyword=${name}&clientId=${id}`);
  }

  removeTeamMemberByGuest(id) {
    return this.http.delete(`${environment.teamBaseUrl}/teams/removeGuestTeamMember/${id}`);
  }

  removeTeamMemberByOrg(id) {
    return this.http.delete(`${environment.teamBaseUrl}/teams/removeOrgTeamMember/${id}`);
  }

  inviteUser(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/sendEmail`, data);
  }

  addUserAsGuest(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/team-membership-guests`, data);
  }

  addUserInOrg(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/team-membership-orgs`, data);
  }

  getAllRoles() {
    return this.http.get(`${environment.teamBaseUrl}/teams/getAllRole`);
  }

  getTeamManagerById(id) {
    return this.http.get(`${environment.teamBaseUrl}/teams/getAllTeamsByManagerId/${id}`);
  }

  getteamInfoById(id) {
    return this.http.get(`${environment.teamBaseUrl}/teams/getTeam/${id}`);
  }

  editTeam(data, id) {
    return this.http.put(`${environment.teamBaseUrl}/teams/editTeam/${id}`, data);
  }

  reInvite(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/sendEmail`, data);
  }

  // Viewing Team Rights
  getAllViewingRightsUsers() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getAllViewingRightsUsers?team_id=${this.teamId}`);
  }

  saveInViewingRightUsers(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/viewingRightsInvite`, data);
  }

  updateInViewingRightUsers(data) {
    return this.http.put(`${environment.teamBaseUrl}/teams/updateViewingRightsUsers`, data);
  }

  updateViewRightsOfTeamMember(data) {
    return this.http.put(`${environment.teamBaseUrl}/teams/update-viewing-rights-team-member`, data);
  }

  getViewRightsTeamMember() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/viewing-rights-team-member?team_id=${this.teamId}`);
  }


  // Team Activity Dashboard
  getTeamActivityData(teamId = null) {

    if(teamId != null) {
      this.teamId = teamId;
    } else {
      const activeRole = localStorage.getItem('Role')
      if(activeRole == Role.TEAM_MEMBER){
      this.teamId = localStorage.getItem('membertid')
      } else {
        this.teamId = localStorage.getItem('selectedTeamId')
      }
    }    
    return this.http.get(`${environment.teamBaseUrl}/teams/team-activity/${this.teamId}`);
  }

  getInclusionData(teamId: any = null) { //set null if teamId  not set from component
    if(teamId != null) {
      this.teamId = teamId;
    }
    return this.http.get(`${environment.teamBaseUrl}/teams/get-scale-avg?team_id=${this.teamId}`);
  }

  getTeamDashData(team_id) {
    return this.http.get(`${environment.teamBaseUrl}/viewing-rights/get-team-dashboard-data?team_id=${team_id}`);
  }

}

