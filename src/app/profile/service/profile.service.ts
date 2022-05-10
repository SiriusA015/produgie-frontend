import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileimage = new BehaviorSubject({});
  sharedimageUrl = this.profileimage.asObservable();
  private imageUrlData: any;

  private prefferedName = new BehaviorSubject({});
  sharedprefferedName = this.prefferedName.asObservable();
  private prefferedNameData: any;

  constructor() { }

  setImage(latestImgUrl: any) {
    this.imageUrlData = {...this.imageUrlData, ...latestImgUrl};
    this.profileimage.next(this.imageUrlData);
  }

  setprefferedname(latestpreferedName: any) {
    this.prefferedNameData = {...this.prefferedNameData, ...latestpreferedName};
    this.prefferedName.next(this.prefferedNameData);
  }

}
