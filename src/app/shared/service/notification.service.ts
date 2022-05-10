import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification = new BehaviorSubject({});
  sharedNot = this.notification.asObservable();
  private totalUnreadCount = 0;
  private teamsNotification = new BehaviorSubject({});
  teamsSharedNot = this.teamsNotification.asObservable();
  private totalUnreadCountTeams = 0;
  teamId: string;
  userId: string;

  constructor(private http: HttpClient) { }

  getUnreadNotifications() {
    this.http
      .get(`${environment.baseurl}/notification/unread-count`)
      .subscribe((res: any) => {
        this.totalUnreadCount = res.data;
        this.notification.next(this.totalUnreadCount);
      });
  }
  getTeamsUnreadCountNotifications() {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.userId = localStorage.getItem('user_id');
    this.http.get(`${environment.teamBaseUrl}/teams/getTeamNotification/unread-count/${this.teamId}?user_id=${this.userId}`).subscribe((res: any) => {
      this.totalUnreadCountTeams = res.notificationCount;
      this.teamsNotification.next(this.totalUnreadCountTeams);
    })
    
  }
  getTeamsUnReadNotifications() {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.userId = localStorage.getItem('user_id');
    return this.http.get(`${environment.teamBaseUrl}/teams/getTeamNotification/unread/${this.teamId}?user_id=${this.userId}`
    )
  }
  getTeamsReadNotifications() {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.userId = localStorage.getItem('user_id');
    return this.http.get(`${environment.teamBaseUrl}/teams/getTeamNotification/read/${this.teamId}?user_id=${this.userId}`
    )
  }
  getTeamsMarkReadNotifications(data) {
    return this.http.put(`${environment.teamBaseUrl}/teams/getTeamNotification/mark-read`,data
    )
  }
  getTeamsMarkAllReadNotifications(data) {
    return this.http.put(`${environment.teamBaseUrl}/teams/getTeamNotification/mark-all-read`,data
    )
  }
  submitWeeklyCheckin(data){
    return this.http.post(`${environment.teamBaseUrl}/teams/postWeeklyCheckInQuestionScore`,data
    )
  }
  teamsSetNotifications(){
    this.getTeamsUnreadCountNotifications();
  }
  setNotification() {
    this.getUnreadNotifications();
  }
}
