import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = {isEdit: false, actionGray: false, behaviourGray: true, outcomeGray: true, step: 1, isEditState: false, modalState: false, surveyCompleted: false, sprintLoadedFromUrl: true, isUrlLoaded: false };
  private message = new BehaviorSubject({});
  sharedMessage = this.message.asObservable();
 
  private isActionEditable = new BehaviorSubject({});
  isEditable = this.isActionEditable.asObservable();

  constructor() { }

  nextMessage(message: any) {
    this.data = {...this.data, ...message};
    this.message.next(this.data);
  }

  setActionEditable(isEditable: boolean) {
    this.isActionEditable.next(isEditable);
  }
}
