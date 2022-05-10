import { DataService } from './../../service/data.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
const baseUrl = environment.baseurl;
export interface IDevelopment {
  id?: number;
  value?: string;
  type?: 'roleDemand' | 'lowestScoring';
}

@Component({
  selector: 'app-focus-development',
  templateUrl: './focus-development.component.html',
  styleUrls: ['./focus-development.component.scss']
})
export class FocusDevelopmentComponent implements OnInit {

  clientId = 1;
  userId = 1;
  data: any;
  assessmentId: number;
  message: any;
  userSprint: any;
  roleDemands: IDevelopment[] = [
    {id: 1, value: 'Build resilience', type: 'roleDemand'},
    {id: 2, value: 'Set vision & inspire action', type: 'roleDemand'},
    {id: 3, value: 'Shape external focus & alignment', type: 'roleDemand'},
    {id: 4, value: 'Develop and empower teams', type: 'roleDemand'}
  ];

  lowestScorings: IDevelopment[] = [
    {id: 5, value: 'Structure and execute growth plans', type: 'lowestScoring'},
    {id: 6, value: 'Build stakeholder relationships', type: 'lowestScoring'},
    {id: 7, value: 'Lead Innovation', type: 'lowestScoring'}
  ];

  selected: IDevelopment[] = [];
  selectedDevelopment = null;
  selectedFad: any[] = [];

  constructor(private http: HttpClient, private router: Router, private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.sharedMessage.subscribe(message => this.message = message);
    // this.getAllData();
    this.getAssessment();
    // tslint:disable-next-line:max-line-length
    this.dataService.nextMessage({fad: false, sprint: false, action: false, behaviour: false, outcome: false, crew: false, frequency: false, isConfirm: false});
  }

  getAssessment() {
    const filterObject = {
      clientId: 1,
      userId: 1
    };
    this.http.get(`${baseUrl}/glaassessment?filter=` + JSON.stringify(filterObject)).subscribe(
      (res: any) => {
        this.assessmentId = res.data[0].id;
        this.http.get(`${baseUrl}/selectedfad?filter=` + JSON.stringify({assessmentId: this.assessmentId})).subscribe(
          (res1: any) => {
            console.log(res1.data);
            this.selectedFad = res1.data;
            if (this.selectedFad.length > 0) {
              this.dataService.nextMessage({fad: true});
            }
            const SelectedId = this.selectedFad.map( o => o.capabilityId);
            // tslint:disable-next-line:max-line-length
            this.selected = [..._.remove(this.roleDemands, o => SelectedId.indexOf(o.id) !== -1 ), ..._.remove(this.lowestScorings, o => SelectedId.indexOf(o.id) !== -1 )];
            console.log(this.selected);
            if (this.selectedFad.length > 0) {
              this.selectedDevelopment = this.selectedFad.filter(o => o.isPriority)[0].capabilityId;
            }
          },
          err1 => {
            console.log(err1);
          }
        );
      },
      err => {
        console.log(err);
      }
     );
  }
  get currentRoute() {
    return this.router.url;
  }
  getAllData() {
    this.http.get(`${environment.baseurl}/development/plan?userId=${this.userId}&clientId=${this.clientId}`).subscribe(
      (res: any) => {
        this.data = res.message;
      },
      err => {
        console.log(err);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  selectDevelopment(id: number) {
    this.selectedDevelopment = id;
  }

  addToAddedList(index: number, type: 'roleDemand' | 'lowestScoring') {
    if (this.selected.length >= 3) { return; }
    if (type === 'roleDemand') {
      this.selected.push(...this.roleDemands.splice(index, 1));
    } else {
      this.selected.push(...this.lowestScorings.splice(index, 1));
    }
  }

  deleteFromAddedList(index: number, type: 'roleDemand' | 'lowestScoring') {
    if (type === 'roleDemand') {
      this.roleDemands.push(...this.selected.splice(index, 1));
    } else {
      this.lowestScorings.push(...this.selected.splice(index, 1));
    }
  }
  storeFad() {
    const payload = {
      selectedFad: []
    };
    this.selected.forEach(o => {
      payload.selectedFad.push(
        {
          capabilityId: o.id,
          assessmentId: this.assessmentId,
          isPriority: this.selectedDevelopment === o.id ? true : false,
          status: false
        }
      );
  });
    console.log(payload);
    this.http.post(`${baseUrl}/selectedfad/add-multi`, payload.selectedFad ).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.router.navigate(['/design/sprint-configure']);
        }
        console.log(res);
      },
      err => console.log(err)
    );
  }
  delete(){
    this.dataService.nextMessage({isEdit: false});
    this.http.delete(`${baseUrl}/selectedfad?filter=` + JSON.stringify({assessmentId: this.assessmentId})).subscribe(
      del0 => {
        this.http.delete(`${baseUrl}/selectedaction?filter=` + JSON.stringify({assessmentId: this.assessmentId})).subscribe(
          del1 => {
            this.http.delete(`${baseUrl}/selectedbehaviour?filter=` + JSON.stringify({assessmentId: this.assessmentId})).subscribe(
              dle2 => {
                this.http.delete(`${baseUrl}/selectedoutcome?filter=` + JSON.stringify({assessmentId: this.assessmentId})).subscribe(
                  del3 => {
                    this.http.delete(`${baseUrl}/usersprint?filter=` + JSON.stringify({assessmentId: this.assessmentId})).subscribe(
                      del4 => {
                        this.storeFad();
                      },
                      err => console.log(err)
                    );
                  },
                  err => console.log(err)
                );
              },
              err => console.log(err)
            );
          },
          err => console.log(err)
        );
      }
    );
  }
}
