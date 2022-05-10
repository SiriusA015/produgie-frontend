import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AssessmentInfo } from 'src/app/models/assessment.model';

@Injectable({
	providedIn: 'root'
})
export class DataCheckService {

	teamId: string;

	constructor(private http: HttpClient) { }

	getAssessmentTrigger(): Observable<AssessmentInfo> {
		return this.http.get<AssessmentInfo>(`${environment.baseurl}/assessmenttrigger/get-info`);
	}

	getStarted() {
		this.teamId = localStorage.getItem('selectedTeamId');

		const data = {
			team_id: this.teamId,
		}

		return this.http.post(`${environment.teamBaseUrl}/teams/design/saveTeamGlaAssessment`, data);
	}
}
