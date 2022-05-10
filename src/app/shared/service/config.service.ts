import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = new BehaviorSubject({});
  sharedConfig = this.config.asObservable();
  private configData: any;
  private isteamActive = new BehaviorSubject({});
  private isTeamCreate = new BehaviorSubject({});
  private isTeamData = new BehaviorSubject({});
  private team_id = new BehaviorSubject({});
  teamCreate = this.isTeamCreate.asObservable();
  teamMessage = this.isteamActive.asObservable();
  teamData = this.isTeamData.asObservable();
  selectedTeamId = this.team_id.asObservable();
  constructor() { }
  private data: any = {};

  setConfig(configMessage: any) {
    this.configData = {...this.configData, ...configMessage};
    this.config.next(this.configData);
  }
  setStatus(message: any) {
    this.data = {...this.data, ...message};
    this.isteamActive.next(this.data);
  }

  setTeam(message: any) {
    this.data = {...this.data, ...message};
    this.isTeamCreate.next(this.data);
  }
  setData(message: any) {
    this.data = {...this.data, ...message};
    this.isTeamData.next(this.data);
  }

  setTeamId(teamId:any) {
    this.team_id.next(teamId);
  }
}
