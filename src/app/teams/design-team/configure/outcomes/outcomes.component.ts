import { Outcome } from './../../../../../models/Outcome';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { DataService } from 'src/app/design/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { DesignService } from '../../design.service';
const baseUrl = environment.baseurl;

@Component({
  selector: 'app-outcomes',
    templateUrl: './outcomes.component.html',
    styleUrls: ['./outcomes.component.scss']
})
export class OutcomesComponent implements OnInit,OnChanges {
  @Input() outcome: Outcome[];
  @Input() customActions: Outcome[] = [];
  @Input() assessmentId;
  @Input() selectedActions: Set<number> = new Set([]);
  @Output() outcomeOut: EventEmitter<any> = new EventEmitter();
  @Output() customActionOut: EventEmitter<any> = new EventEmitter();
  @Input() grayOverlay;
  isLoading = false;
  sprintId;
  shownAction: Set<number> = new Set([]);
  shownActionCustom: Set<number> = new Set([]);
  maxSelection = 3;
  actions: Outcome[] = [];
  // selectedActions: Set<number> = new Set([]);
  selectedActionsIndex: Set<number> = new Set([]);
  selectedActionsCustom: Set<number> = new Set([]);
  selectedActionsIndexCustom: Set<number> = new Set([]);
  customForm = new FormGroup({
    label: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    // sprint_id: new FormControl(localStorage.getItem('sprint_Id'), Validators.required),
    // user_id: new FormControl(localStorage.getItem('user_id'), Validators.required),
    // assessment_id: new FormControl(88, Validators.required),
  });
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private toastr : ToastrService,
    private designService: DesignService

  ) { }

  ngOnInit(): void {
    this.actions = this.outcome;
  }

  ngOnChanges(){ 
    this.outcomeOut.emit(this.selectedActions);
  }
  saveSelected(id: number, isCustom: boolean){
    this.isLoading = true;
    const payload = {
      outcomeId: id,
      isCustom
    };
    
    // this.http.post('https://produgie-dummy-api.herokuapp.com/sprint/add-sel',payload ).subscribe(
    //   (res: any) => {
        if (isCustom) {
          this.selectedActionsCustom.add(id);
          this.selectedActionsIndexCustom.delete(Array.from(this.selectedActionsCustom.values()).indexOf(id));
          this.sendDataService();
          this.outcomeOut.emit(this.selectedActionsCustom);
        } else {
          this.selectedActions.add(id);
          this.selectedActionsIndex.delete(Array.from(this.selectedActions.values()).indexOf(id));
          this.sendDataService();
          this.outcomeOut.emit(this.selectedActions);
        }
        this.isLoading = false;
    //   },
    //   err => console.log(err)
    // );
  }
  deleteSelected(id: number, index: number, isCustom: boolean) {
    this.isLoading = true;
    if (isCustom) {
      this.http.delete(`${baseUrl}/selectedoutcome/custom/${id}`).subscribe(
        (res: any) => {
            this.selectedActionsCustom.delete(id);
            this.selectedActionsIndexCustom.delete(index);
            this.sendDataService();
            this.outcomeOut.emit(this.selectedActionsCustom);
            this.isLoading = false;
        },
        (err) => {
          this.selectedActionsCustom.delete(id);
            this.selectedActionsIndexCustom.delete(index);
            this.sendDataService();
            this.outcomeOut.emit(this.selectedActionsCustom);
            this.isLoading = false;
            console.log(err)}
      );
    } else {
      this.http.delete(`${baseUrl}/selectedoutcome/${id}`).subscribe(
        (res: any) => {
          
            this.selectedActions.delete(id);
            this.selectedActionsIndex.delete(index);
            this.sendDataService();
            this.outcomeOut.emit(this.selectedActions);
            this.isLoading = false;
        },
        (err) => {
          this.selectedActions.delete(id);
            this.selectedActionsIndex.delete(index);
            this.sendDataService();
            this.outcomeOut.emit(this.selectedActions);
            this.isLoading = false;
            console.log(err)}
      );
    }
  }
  selectAction(action: Outcome, index: number) {
    const isCustom = false;
   
    if ((this.selectedActions.size + this.selectedActionsCustom.size) === this.maxSelection) {
      if (this.selectedActions.has(action.id)) {
        this.deleteSelected(action.id, index, isCustom);
      }
    } else {
      if (this.selectedActions.has(action.id)) {
        this.deleteSelected(action.id, index, isCustom);
      } else {
        this.saveSelected(action.id, isCustom);
      }

      if (this.selectedActionsIndex.has(index)) {
        this.selectedActionsIndex.delete(index);
      } else {
        this.selectedActionsIndex.add(index);
      }
    }
  }
  selectActionCustom(action: Outcome, index: number) {
    const isCustom = true;
    if ((this.selectedActions.size + this.selectedActionsCustom.size) === this.maxSelection) {
      if (this.selectedActionsCustom.has(action.id)) {
        this.deleteSelected(action.id, index, isCustom);
      }
    } else {
      if (this.selectedActionsCustom.has(action.id)) {
        this.deleteSelected(action.id, index, isCustom);
      } else {
        this.saveSelected(action.id, isCustom);
      }

      if (this.selectedActionsIndexCustom.has(index)) {
        this.selectedActionsIndexCustom.delete(index);
      } else {
        this.selectedActionsIndexCustom.add(index);
      }
    }
  }
  sendDataService(){
    if (this.selectedActions.size > 0 || this.selectedActionsCustom.size > 0) {
      this.dataService.nextMessage({outcome: true});
    } else {
      this.dataService.nextMessage({outcome: false});
    }
  }
  
  showDescription(id: number) {
    if (this.shownAction.has(id)) {
      this.shownAction.delete(id);
    }
    else {
      this.shownAction.add(id);
    }
  }
  showDescriptionCustom(id: number) {
    if (this.shownActionCustom.has(id)) {
      this.shownActionCustom.delete(id);
    } else {
      this.shownActionCustom.add(id);
    }
  }

  grayClicked() {
    this.dataService.nextMessage({actionGray: true, behaviourGray: true, outcomeGray: false});
  }

  expandAll() {
    if (this.shownAction.size === this.actions.length && this.shownActionCustom.size === this.customActions.length) {
      this.shownAction.clear();
      this.shownActionCustom.clear();
    } else {
      const actionIds = this.actions.map(o => o.id);
      const customActionsIds = this.customActions.map(o => o.id);
      this.shownAction = new Set(actionIds);
      this.shownActionCustom = new Set(customActionsIds);
    }
  }
  clearCustomForm(){
    this.customForm.reset();
  }
  stopPropagation(event){
    event.stopPropagation();
  }
  addCustom(){
    this.isLoading = true;
    const payload = {
      label:this.customForm.value.label,
      description:this.customForm.value.description,
      sprint_id:localStorage.getItem('sprint_Id'),
      assessment_id:localStorage.getItem('assesmentId'),
      team_id:localStorage.getItem('selectedTeamId')
    };
    // this.http.post(`${baseUrl}/customoutcome/add-outcome`, payload).subscribe(
      this.designService.addCustomeOutCome(payload).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.customActionOut.emit({added: true});
        this.toastr.success('Success', "Custom Added Successfully", {
          timeOut: 3000,
        });
      },
      err => {
        console.log(err);
        this.customActionOut.emit({added: false});
      }
    );
  }
  deleteOutcome(action){
    this.isLoading = true;
    this.designService.deleteCustomOutcome(action.id).subscribe((res:any)=>{
      this.isLoading = false;
      this.customActionOut.emit({added: true});
      this.toastr.success('Success', "Custom Deleted Successfully", {
        timeOut: 3000,
      });
    },
      err => {
        console.log(err);
        this.customActionOut.emit({added: false});
      })
  }
  next(){
    this.grayOverlay = true;
    this.dataService.nextMessage({
      actionGray:true,
      behaviourGray:true,
      outcomeGray: true,
      sprint: true,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      crew: false,
      sprintShow:false,
      action:false,
      behaviour:true,
      outcome:true,
      step: 2,
    });
  }
}

