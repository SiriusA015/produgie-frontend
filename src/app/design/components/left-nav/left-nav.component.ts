import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';
import { ConfigService } from './../../../shared/service/config.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  message: any;
  isEditState: boolean;
  sprintLoadedFromUrl: boolean;
  routes = {
    fad: ['/design/sprint-focus'],
    sprint: [
      '/design/sprint-configure',
      '/design/sprint/2',
    ],
    support: ['/design/sprint-crew-role'],
    confirm: [
      '/design/sprint-frequency',
      '/design/sprint-final'
    ]
  };

  constructor(
    private router: Router, 
    private dataService: DataService, 
    private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.dataService.sharedMessage.subscribe(message => {
      this.message = message;
      this.isEditState = this.message.isEditState;
      this.sprintLoadedFromUrl = this.message.sprintLoadedFromUrl;
    });
  }
  
  editFocus() {
    if (this.isEditState || this.sprintLoadedFromUrl){
      this.router.navigateByUrl('/design/fad');
    }
  }
  
  editPriority() {
    if (this.isEditState || this.sprintLoadedFromUrl){
      this.router.navigateByUrl('/design/fad-priority');
    }
  }

  editConfigure(){
    if (this.isEditState || this.sprintLoadedFromUrl){
      this.router.navigateByUrl('/design/sprint-configure');
    }
  }

  editSprint(){
    if (this.isEditState || this.sprintLoadedFromUrl){
      this.configService.setConfig({ isLoader: false });
      this.dataService.nextMessage({
        isEdit: false,
        isResetDesignEdit: true,
      });
      this.router.navigate(['/design/sprint']);
    }
  }

  editCrew(type) {
    if (this.isEditState || this.sprintLoadedFromUrl){
      this.router.navigate(['/design/sprint-crew-role']);
    }
  }

  editFrequency() {
    if (this.isEditState){
      this.router.navigateByUrl('/design/sprint-frequency');
    }
  }


  get currentRoute() {
    return this.router.url;
  }

}
