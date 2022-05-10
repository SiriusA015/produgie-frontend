import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private rankConfig = new BehaviorSubject({});
  rank = this.rankConfig.asObservable();
  private configData: any;

  constructor() { }

  setConfig(configMessage: any) {
    this.configData = {...this.configData, ...configMessage};
    this.rankConfig.next(this.configData);
  }
}
