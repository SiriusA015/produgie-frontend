import { Behaviour } from './../../../../../models/Behaviour';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { DataService } from 'src/app/design/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { DesignService } from '../../design.service';
const baseUrl = environment.baseurl;

@Component({
  selector: 'app-behaviours',
  templateUrl: './behaviours.component.html',
  styleUrls: ['./behaviours.component.scss'],
})
export class BehavioursComponent implements OnInit, OnChanges {
  @Input() behaviour: Behaviour[];
  @Input() customActions: Behaviour[] = [];
  @Input() assessmentId;
  @Input() selectedActions: Set<number> = new Set([]);
  @Output() behaviourOut: EventEmitter<any> = new EventEmitter();
  @Output() customBehaviourOut: EventEmitter<any> = new EventEmitter();
  @Input() grayOverlay;
  isLoading = false;
  sprintId;
  shownAction: Set<number> = new Set([]);
  shownActionCustom: Set<number> = new Set([]);
  isChecked = false;
  maxSelection = 3;
  actions: Behaviour[] = [];
  // selectedActions: Set<number> = new Set([]);
  selectedActionsIndex: Set<number> = new Set([]);
  selectedActionsCustom: Set<number> = new Set([]);
  selectedActionsIndexCustom: Set<number> = new Set([]);
  customForm = new FormGroup({
    label: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    // sprint_id: new FormControl(localStorage.getItem('sprint_Id'), Validators.required),
    // user_id: new FormControl(localStorage.getItem('user_id'), Validators.required),
    // assessment_id: new FormControl(89, Validators.required),
  });
  showDiv: boolean = true;
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private toastr: ToastrService,
    private designService: DesignService

  ) { }

  ngOnInit(): void {
    this.actions = this.behaviour;
  }

  ngOnChanges(){
   this.behaviourOut.emit(this.selectedActions);
  }

  saveSelected(id: number, isCustom: boolean) {
    this.isLoading = true;
    const payload = {
      behaviourId: id,
      isCustom,
    };
    if (isCustom) {
      this.selectedActionsCustom.add(id);
      this.selectedActionsIndexCustom.delete(
        Array.from(this.selectedActionsCustom.values()).indexOf(id)
      );
      this.sendDataService();
      this.behaviourOut.emit(this.selectedActionsCustom);
    } else {
      this.selectedActions.add(id);
      this.selectedActionsIndex.delete(
        Array.from(this.selectedActions.values()).indexOf(id)
      );
      this.sendDataService();
      this.behaviourOut.emit(this.selectedActions);
    }
    this.isLoading = false;
  }
  deleteSelected(id: number, index: number, isCustom: boolean) {
    this.isLoading = true;
    if (isCustom) {
      this.http.delete(`${baseUrl}/selectedbehaviour/custom/${id}`).subscribe(
        (res: any) => {
          this.selectedActionsCustom.delete(id);
          this.selectedActionsIndexCustom.delete(index);
          this.sendDataService();
          this.behaviourOut.emit(this.selectedActionsCustom);
          this.isLoading = false;
        },
        (err) => {
          this.selectedActionsCustom.delete(id);
          this.selectedActionsIndexCustom.delete(index);
          this.sendDataService();
          this.behaviourOut.emit(this.selectedActionsCustom);
          this.isLoading = false;
          console.log(err)}
      );
    } else {
      this.http.delete(`${baseUrl}/selectedbehaviour/${id}`).subscribe(
        (res: any) => {
          this.selectedActions.delete(id);
          this.selectedActionsIndex.delete(index);
          this.sendDataService();
          this.behaviourOut.emit(this.selectedActions);
          this.isLoading = false;
        },
        (err) => {
          this.selectedActions.delete(id);
          this.selectedActionsIndex.delete(index);
          this.sendDataService();
          this.behaviourOut.emit(this.selectedActions);
          this.isLoading = false;
          console.log(err)}
      );
    }
  }
  selectAction(action: Behaviour, index: number) {
    const isCustom = false;
    if (
      this.selectedActions.size + this.selectedActionsCustom.size ===
      this.maxSelection
    ) {
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
  selectActionCustom(action: Behaviour, index: number) {
    const isCustom = true;
    if (
      this.selectedActions.size + this.selectedActionsCustom.size ===
      this.maxSelection
    ) {
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
  sendDataService() {
    if (this.selectedActions.size > 0 || this.selectedActionsCustom.size > 0) {
      this.dataService.nextMessage({ behaviour: true });
    } else {
      this.dataService.nextMessage({ behaviour: false });
    }
  }

  showDescription(id: number) {
    if (this.shownAction.has(id)) {
      this.shownAction.delete(id);
    } else {
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
    this.dataService.nextMessage({
      actionGray: true,
      behaviourGray: false,
      outcomeGray: true,
    });
  }

  expandAll() {
    if (
      this.shownAction.size === this.actions.length &&
      this.shownActionCustom.size === this.customActions.length
    ) {
      this.shownAction.clear();
      this.shownActionCustom.clear();
    } else {
      const actionIds = this.actions.map((o) => o.id);
      const customActionsIds = this.customActions.map((o) => o.id);
      this.shownAction = new Set(actionIds);
      this.shownActionCustom = new Set(customActionsIds);
    }
  }

  addCustom() {
    this.isLoading = true;
    const payload = {
      label:this.customForm.value.label,
      description:this.customForm.value.description,
      sprint_id:localStorage.getItem('sprint_Id'),
      assessment_id:localStorage.getItem('assesmentId'),
      team_id:localStorage.getItem('selectedTeamId')
    }
    this.designService.addCustomeBehavior(payload).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.customBehaviourOut.emit({ added: true });
        this.toastr.success('Success', "Custom Added Successfully", {
          timeOut: 3000,
        });
      },
      (err) => {
        this.toastr.error('error', "Something Went Wrong", {
          timeOut: 3000,
        });
        this.customBehaviourOut.emit({ added: false });
      }
    );
  }
  deleteBehaviour(action){
    this.isLoading = true;
    this.designService.deleteCustomBehaviour(action.id).subscribe((res:any)=>{
      this.isLoading = false;
      this.customBehaviourOut.emit({added: true});
      this.toastr.success('Success', "Custom Deleted Successfully", {
        timeOut: 3000,
      });
    },
      err => {
        console.log(err);
        this.customBehaviourOut.emit({added: false});
      })
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
  clearCustomForm() {
    this.customForm.reset();
  }
  // addCustom() {
  //   this.isLoading = true;
  //   const payload = this.customForm.value;
  //   this.http
  //     // .post(`${baseUrl}/custombehaviour/add-behaviour`, payload)
  //     this.designService.addCustomeBehavior(payload)
  //     .subscribe(
  //       (res: any) => {
  //         this.isLoading = false;
  //         this.customActionOut.emit({ added: true });
  //         this.toastr.success('Success', "Custom Added Successfully", {
  //           timeOut: 3000,
  //         });
  //       },
  //       (err) => {
  //         console.log(err);
  //         this.customActionOut.emit({ added: false });
  //       }
  //     );
  // }
  next() {
    this.showDiv = false;
    this.dataService.nextMessage({
      actionGray: true,
      behaviourGray: true,
      outcomeGray: false,
      sprint: true,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      crew: false,
      sprintShow: false,
      action: false,
      behaviour: false,
      outcome: true,
      step: 2,
    });
  }
}
