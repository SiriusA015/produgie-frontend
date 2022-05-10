import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamdevelopmentService {

  teamId: string;

  constructor(private http: HttpClient) { }

  getStatusofAdvice(uuid){
    return this.http.get(`${environment.teamBaseUrl}/guest/adviceStatus?uuid=${uuid}`);
  }

  getadvice(uuid) {
    return this.http.get(`${environment.teamBaseUrl}/guest/getDevPlan?uuid=${uuid}`);
  }

  addAdvice(data) {
    return this.http.post(`${environment.teamBaseUrl}/guest/addSprintAdvice`, data);
  }

  UpdateAdvice(data) {
    return this.http.put(`${environment.teamBaseUrl}/guest/updateSprintAdvice`, data)
  }

  getStatusofFeedback(uuid){
    return this.http.get(`${environment.teamBaseUrl}/guest/feedbackStatus?uuid=${uuid}`);
  }

  getfeedback(uuid) {
    return this.http.get(`${environment.teamBaseUrl}/guest/getDevPlanForFeedback?uuid=${uuid}`);
  }

  addfeedback(data) {
    return this.http.post(`${environment.teamBaseUrl}/guest/addSprintFeedback`, data);
  }

  getCapabilities(uuid) {
    return this.http.get(`${environment.teamBaseUrl}/guest/getCapabilitiesDataForAdvice`);
  }

}
