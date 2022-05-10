import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public surveystatus = new BehaviorSubject({});
  // sharedNot = this.surveystatus.asObservable();
  private glaSurveyCompleted;

  constructor(private http: HttpClient) { }

getsurveystatus(){
  
  this.http.get(`${environment.baseurl}/question/get-gla-status`)
      .subscribe((res: any) => {
        this.glaSurveyCompleted = res.message['gla_survey_completed'];
        this.surveystatus.next(this.glaSurveyCompleted);
        console.log(this.glaSurveyCompleted);
      });

}

setsurvey() {
  this.getsurveystatus();
}


  getAllStatus() {
    return this.http.get(`${environment.baseurl}/question/get-gla-status`);
  }
}

