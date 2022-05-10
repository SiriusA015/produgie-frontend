import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ExploreService {

  teamId: string;

  constructor(private http: HttpClient) { }

  // Gl Report

  getGrowthLeaderTeamReportList() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getTeamOrgMembers/${this.teamId}`)
  }

  getGrowthLeaderStatus() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getGrowthLeaderTeamReportStatus/${this.teamId}`)
  }

  glaGenarateStatus() {
    this.teamId = localStorage.getItem('selectedTeamId');

    return this.http.get(`${environment.teamBaseUrl}/teams/getGlaReportStatus/${this.teamId}`);
  }

  notifyEmail(data) {
    return this.http.post(`${environment.teamBaseUrl}/teams/sendSurveyNotification`, data);
  }

  // GL Team Profile

  getcycleDescription() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getTeamRoleDescriptionByTeamId/${this.teamId}`)
  }

  getglaGenarateReport() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/generateTeamRoleReport/${this.teamId}`)
  }

  getIndiviual() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getIndividualRoleData/${this.teamId}`)

  }

  getDetailReportGla() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/fetchGlaDonutCapabilityDataReportByTeamId?team_id=${this.teamId}`);
  }

  getdonutDescription(id, data) {
    let new_text = data.replace("&", "And");
    return this.http.get(`${environment.teamBaseUrl}/teams/getGlaDonutCapabilityDataReportByTeamId/${id}?capability_name=${new_text}`);
  }

  GetDonutDetails() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/glaDonutResponse/${this.teamId}`);

  }

  // Team Alignment
  getQuestionsData(params) {
    return this.http.get(`${environment.teamBaseUrl}/guest/getQuestions?pageNo=${params.pageNo}&pageSize=${params.pageSize}&direction=${params.direction}&sortBy=${params.sortBy}&user_id=${params.user_id}&team_id=${params.team_id}&user_type=${params.user_type}`);
  }

  getAllTeamMembers() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getAllTeamMembers/${this.teamId}`);
  }

  getSurveyReportStatus() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getSurveyReportStatus/${this.teamId}`);
  }

  getResearchQuestions(pageNo, pageSize, direction, sortBy) {
    return this.http.get(`${environment.teamBaseUrl}/users/teams/searchMember?pageNo=${pageNo}&pageSize=${pageSize}&direction=${direction}&sortBy=${sortBy}`);
  }

  saveAnswers(data) {
    return this.http.post(`${environment.teamBaseUrl}/guest/saveAnswers`, data);
  }

  sendSurvey() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/startSurvey?team_id=${this.teamId}`);
  }

  getScaleReportData(scaleType) {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getScaleReport?team_id=${this.teamId}&scale=${scaleType}`);
  }

  viewDetailsReportForCycleView(){
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/fetchViewDetailsReportTeamId?team_id=${this.teamId}`);
  }

  generateTeamAlignmentReport() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/generateTeamAlignmentReport/${this.teamId}`);
  }

  viewDetailsReportForTeamAlign() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/viewDetailReport?team_id=${this.teamId}`);
  }

  getSurveyStatus() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/startSurveyStatus/${this.teamId}`);
  }

  getFilteredData() {
    this.teamId = localStorage.getItem('selectedTeamId');
    return this.http.get(`${environment.teamBaseUrl}/teams/getAlignmentScaleRanks?team_id=${this.teamId}`);
  }
}
