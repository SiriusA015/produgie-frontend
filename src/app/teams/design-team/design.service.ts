import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { identity } from 'lodash';
import { Role } from 'src/app/auth/Role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  teamId: string;
  sprinId: string;

  constructor(private http: HttpClient) {

    const activeRole = localStorage.getItem('Role')

    if (activeRole == Role.TEAM_MEMBER) {
      this.teamId = localStorage.getItem('membertid')
    } else {
      this.teamId = localStorage.getItem('selectedTeamId')
    }
  }
  getStarted() {
    this.teamId = localStorage.getItem('selectedTeamId');
    let data = {
      team_id: this.teamId,
    }
    return this.http.post(`${environment.teamBaseUrl}/teams/design/saveTeamGlaAssessment`, data);

  }
  getCapabilities() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getCapabilities/${this.teamId}`);

  }
  getRoles() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getGlaRoles/${this.teamId}`);

  }
  getAlignmentArea() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getAlignmentAreas/${this.teamId}`);
  }
  addPriority(capId, roleId, areaId) {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.post(`${environment.teamBaseUrl}/teams/design/addFad/${this.teamId}?capabilities=${capId}&roles=${roleId}&areas=${areaId}`, null);
  }
  getFad() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getFad/${this.teamId}`)
  }
  setFad(data) {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/setFadPriority/${this.teamId}?${data}`);
  }
  getAllSprint(priority) {
    priority = encodeURIComponent(priority);
    return this.http.get(`${environment.teamBaseUrl}/teams/getAllConfigureSprints?priority_name=${priority}`);

  }
  getFilteredSprint(filterData) {
    return this.http.get(`${environment.teamBaseUrl}/teams/getAllConfigureSprintList?themes=${filterData.themes}&levels=${filterData.levels}&libraries=${filterData.libraries}&sprint_durations=${filterData.sprint_duration}&growth_leader_favourites=${filterData.glf}&priority_name=${filterData.priority_name}`);
  }

  addConfigureSprint(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/configureSprint`, data);

  }
  getallCrewRoles() {
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getAllSprintCrewRoles`);
  }
  getCrewMember(id) {
    // this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getAllSprintCrewMember?team_id=${this.teamId}&team_sprint_id=${id}`);

  }
  addSprintCrew(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/design/addSprintCrewMember`, data);
  }
  editSprintCrew(id, data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/design/updateSprintCrewMember/${id}`, data);
  }
  deleleSprintCrew(id) {
    return this.http.delete(`${environment.teamBaseUrl}/teams/design/removeSprintCrewMember/${id}?`);
  }

  getTeamSprint(teamId: any = null) { //set null if teamId  not set from component

    if (teamId != null) {
      this.teamId = teamId;
    }
    // this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getCurrentSprint/${this.teamId}`);

  }
  cycledescription(id) {
    return this.http.get(`${environment.teamBaseUrl}/teams/getTeamRoleDescriptionByTeamId/${id}`);
  }

  // Start Action Behaviour Outcome Apis

  getAction(sprint_id) {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getAction?sprint_id=${sprint_id}&team_id=${this.teamId}`);
  }
  getBehaviour(sprint_id) {
    return this.http.get(`${environment.teamBaseUrl}/teams/getBehaviour?sprint_id=${sprint_id}`);
  }
  getOutcome(sprint_id) {
    return this.http.get(`${environment.teamBaseUrl}/teams/getOutCome?sprint_id=${sprint_id}`);
  }

  addCustomeAction(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/addCustomeAction`, data);
  }

  addCustomeBehavior(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/addCustomeBehavior`, data);
  }

  addCustomeOutCome(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/addCustomeOutCome`, data);
  }

  addSelectedActionData(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/addSelectedActionData`, data);
  }

  addActionStackHolder(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/addActionStackHolder`, data);
  }
  addLead(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/addLead`, data);
  }

  getLead() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getTeamOrgMembers/${this.teamId}`);

  }

  getAllSelected(sprint_id) {
    return this.http.get(`${environment.teamBaseUrl}/teams/fetchSelectedActionData?team_id=${this.teamId}&sprint_id=${sprint_id}`);
  }

  // End Action Behaviour Outcome Apis

  getallCrew() {
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getAllSprintCrewRoles`);
  }

  // Shedular

  getFeedbackFrequencies() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getFeedbackFrequencies/${this.teamId}`);
  }

  scheduleRoutine(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/scheduleRoutine`, data);
  }

  getScheduleRoutineDetails() {

    this.teamId = localStorage.getItem('selectedTeamId');
    this.sprinId = localStorage.getItem('sprint_Id')
    return this.http.get(`${environment.teamBaseUrl}/teams/getScheduleRoutineDetails?team_id=${this.teamId}&sprint_id=${this.sprinId}`);

  }

  updateTeamFeedbackFreqAndEndDate(data) {
    return this.http.put(`${environment.teamBaseUrl}/teams/updateTeamFeedbackFreqAndEndDate`, data)
  }

  // configureSprint(data) {
  //   return this.http.post(`${environment.teamBaseUrl}/teams/configureSprint`, data);
  // }

  // getCurrentSprint(){
  //   this.teamId = localStorage.getItem('selectedTeamId');
  //   return this.http.get(`${environment.teamBaseUrl}/teams/getCurrentSprint/${this.teamId}`);

  teamDesignStatus() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/teamDesignStatus/${this.teamId}`);
  }

  shareDesign(id) {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/shareDesign?team_id=${this.teamId}&team_sprint_id=${id}`);

  }
  getStakeHolder(params) {
    return this.http.get(`${environment.teamBaseUrl}/teams/fetchStackHolder?team_id=${params.team_id}&sprint_id=${params.sprint_id}`);
  }
  deleteCustomAction(id) {
    return this.http.delete(`${environment.teamBaseUrl}/teams/deleteCustomeAction?custom_action_id=${id}`);

  }
  deleteCustomBehaviour(id) {
    return this.http.delete(`${environment.teamBaseUrl}/teams/deleteCustomeBehaviour?custom_Behaviour_id=${id}`);

  }
  deleteCustomOutcome(id) {
    return this.http.delete(`${environment.teamBaseUrl}/teams/deleteCustomeOutCome?custom_OutCome_id=${id}`);

  }
  getGlaReportStatus() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getGlaReportStatus/${this.teamId}`);

  }
  getTeamAlignmentStatus() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getTeamAlignmentReportStatus?team_id=${this.teamId}`);
  }

  getGuestDetailForDevPlan(teamId) {
    return this.http.get(`${environment.teamBaseUrl}/viewing-rights/get-sprint-design-data?team_id=${teamId}`)
  }
}