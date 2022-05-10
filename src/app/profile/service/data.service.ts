import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = {isEdit: false, actionGray: false, behaviourGray: true, outcomeGray: true, step: 1};
  private message = new BehaviorSubject({});
  sharedMessage = this.message.asObservable();
 
  constructor() { }

  nextMessage(message: any) {
    this.data = {...this.data, ...message};
    this.message.next(this.data);
  }
}
