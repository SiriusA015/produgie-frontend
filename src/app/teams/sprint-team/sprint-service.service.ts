import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { locale } from 'faker';
import { Role } from 'src/app/auth/Role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintServiceService {

  teamId: string;
  sprintId: string;
  teamSprintId: string;

  constructor(private http: HttpClient) {
    const activeRole = localStorage.getItem('Role')
    
    if(activeRole == Role.TEAM_MEMBER){
     this.teamId = localStorage.getItem('membertid')
    } else {
      this.teamId = localStorage.getItem('selectedTeamId')
    }
  }
  getSprintData(teamId){
    // let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getData?team_id=${teamId}`);
  }
  getSelectedAction(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/fetchSelectedActionData?team_id=${teamId}&sprint_id=${id}`);

  }
  getFeedBackData(id, teamId:any = null){
    if(teamId != null) {
      this.teamId = teamId;
    }
    return this.http.get(`${environment.teamBaseUrl}/teams/getFeedback?team_id=${this.teamId}&sprint_id=${id}`);

  }
  getAdviceData(id, teamId:any = null){
    if(teamId != null) {
      this.teamId = teamId;
    }

    return this.http.get(`${environment.teamBaseUrl}/teams/getAdvice?team_id=${this.teamId}&sprint_id=${id}`);

  }
  getCrewMember(id) {
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/getAllSprintCrewMember?team_id=${teamId}&team_sprint_id=${id}`);

  }
  teamDesignStatus(){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/design/teamDesignStatus/${teamId}`);

  }
  extendSprint(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/extendWeek?team_id=${teamId}&sprint_id=${id}`)
  }
  cancelSprint(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.delete(`${environment.teamBaseUrl}/teams/execution/cancelledSprint?team_id=${teamId}&sprint_id=${id}`)
    // return this.http.get(`${environment.teamBaseUrl}/teams/cancleSprint?team_id=${teamId}&sprint_id=${id}`)
  }
  saveToPortfolio(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/saveToPortFolio?team_id=${teamId}&sprint_id=${id}`)
  }
  getAllProgressData(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getInProgressActions?team_id=${teamId}&sprint_id=${id}`)
  }
  getCompletedActions(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getCompletedActions?team_id=${teamId}&sprint_id=${id}`)
  }
  moveInProgress(data){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.post(`${environment.teamBaseUrl}/teams/execution/moveActionToInProgress`,data)

  }
  moveToDone(data){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.patch(`${environment.teamBaseUrl}/teams/execution/updateActionStatus?team_id=${teamId}&sprint_id=${data.sprint_id}&selected_action_id=${data.selected_action_id}&user_id=${data.user_id}`,{})
  }
  getAllActivity(){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getAllTeamActivityTypes`)
  }
  getStakeholder(sprint_id) {
    let teamId = localStorage.getItem('selectedTeamId');
    // return this.http.get(`${environment.teamBaseUrl}/teams/execution/fetchStackHolders`)
    return this.http.get(`${environment.teamBaseUrl}/teams/teams/fetchStackHolders?team_id=${teamId}&sprint_id=${sprint_id}`);
  }
  createEvent(data){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.post(`${environment.teamBaseUrl}/teams/execution/createEvent`,data)

  }
  getAllEventsByTeamId(){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getAllEventsByTeamId/${teamId}`);
 
  }
  getEventsByActionId(actionId){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getEventsForAction?team_id=${teamId}&selected_action_id=${actionId}`);

  }
  roadmapTodoActions(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/fetchSelectedActionsData?team_id=${teamId}&sprint_id=${id}`);

  }
  submitComment(data){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.post(`${environment.teamBaseUrl}/teams/execution/addComment`,data)
  }
  getComments(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getComments/${id}`);

  }
  viewEventByEventId(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getEvents?event_id=${id}`);

  }
  addStakeholder(data){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.post(`${environment.teamBaseUrl}/teams/execution/addActionStackHolder`,data)

  }
  updateEvent(data,id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.post(`${environment.teamBaseUrl}/teams/execution/editEvent/${id}`,data)

  }
  deleteEvent(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.delete(`${environment.teamBaseUrl}/teams/execution/deleteEvent?event_id=${id}`)

  }
  getLinkById(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/getEventLink/${id}`);

  }
  getActionOutcomeGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/actionVsOutcome?team_id=${teamId}&sprint_id=${id}`);
  }
  getbehaviourOutcomeGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/behaviourVsOutcome?team_id=${teamId}&sprint_id=${id}`);
  }
  getCrewOutcomeGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/crewVsOutcome?team_id=${teamId}&sprint_id=${id}`);
  }
  getReflectOutcomeGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/reflectVsOutcome?team_id=${teamId}&sprint_id=${id}`);
  }
  getActionGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/actionTrendsData?team_id=${teamId}&sprint_id=${id}`);
  }
  getBehaviourGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/behaviourTrendsData?team_id=${teamId}&sprint_id=${id}`);
  }
  getOutcomeGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/outcomeTrendsData?team_id=${teamId}&sprint_id=${id}`);
  }
  getEnlistGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/enlistTrendsData?team_id=${teamId}&sprint_id=${id}`);
  }
  getReflectGraph(id){
    let teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/execution/reflectTrendsData?team_id=${teamId}&sprint_id=${id}`);
  }
}
