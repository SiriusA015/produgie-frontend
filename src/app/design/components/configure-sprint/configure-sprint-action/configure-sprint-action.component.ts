import { CustomValidators } from 'ngx-custom-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InviteDialogComponent } from './../modals/invite-dialog/invite-dialog.component';
import { Action } from './../../../../../models/Action';
import { HttpClient } from '@angular/common/http';

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../../service/data.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import * as _ from 'lodash';
import { StakeholderComponent } from '../../stakeholder/stakeholder.component';
import { MatSnackBar } from '@angular/material/snack-bar';
const baseUrl = environment.baseurl;

@Component({
  selector: 'app-configure-sprint-action',
  templateUrl: './configure-sprint-action.component.html',
  styleUrls: ['./configure-sprint-action.component.scss'],
})
export class ConfigureSprintActionComponent implements OnInit {
  @ViewChildren('menuTrigger') menu: QueryList<MatMenuTrigger>;
  @ViewChild('formmenu') formmenu;
  isOpen = false;
  sprintId;
  selectedInvite = null;
  selectedActions: Set<number> = new Set([]);
  selectedActionsIndex: Set<number> = new Set([]);
  selectedActionsCustom: Set<number> = new Set([]);
  selectedActionsIndexCustom: Set<number> = new Set([]);
  shownAction: Set<number> = new Set([]);
  shownActionCustom: Set<number> = new Set([]);
  isChecked = false;
  maxSelection = 6;
  stakeholder = [];
  comp = StakeholderComponent;
  // customAction: Action[] = [];
  stakeholderForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, CustomValidators.email]),
  });
  customForm = new FormGroup({
    label: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });
  isLoading = false;
  @Input() actions: Action[];
  @Input() customActions: Action[] = [];
  @Input() assessmentId;
  @Input() grayOverlay;
  @Output() actionOut: EventEmitter<any> = new EventEmitter();
  @Output() customActionOut: EventEmitter<any> = new EventEmitter();
  showDone: boolean = true;
  @ViewChild('secondDialog', { static: true }) secondDialog;
  array1: any;
  stakeCachingData: any;
  formData: any;
  dialogValue: boolean = false;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // this.getSelected();
    console.log('grey', this.grayOverlay, this.actions)
    this.showDone = true;
    // this.getcachindData();
  }

  getSelected() {
    this.http.get(`${baseUrl}/selectedaction/get-sel`).subscribe(
      (res: any) => {
        console.log('selectedact', res);
        const selectedIds = res.data.filter(o => !o.isCustom).map((o) => o.actionId);
        console.log('selected', selectedIds);

        const selectedCustomIds = res.data.filter(o => o.isCustom).map((o) => o.customActionId);
        this.selectedActions = new Set(selectedIds);
        this.selectedActionsCustom = new Set(selectedCustomIds);
        this.actions.forEach((o, i) => {
          if (this.selectedActions.has(o.id)) {
            this.selectedActionsIndex.add(i);
            const selAction = _.find(res.data, (obj) => obj.actionId === o.id && !obj.isCustom);
            console.log('@@@@@', selAction);
            if (selAction) {
              this.actions[i].selectedActionId = selAction.id;
            }
          }
        });
        this.customActions.forEach((o, i) => {
          if (this.selectedActionsCustom.has(o.id)) {
            this.selectedActionsIndexCustom.add(i);
            const selAction = _.find(res.data, (obj) => obj.customActionId === o.id && obj.isCustom);
            console.log(selAction);
            if (selAction) {
              this.customActions[i].selectedActionId = selAction.id;
            }
          }
        });
        this.actionOut.emit(this.selectedActions);
        if (selectedIds.length > 0) {
          // alert('idsss')
          this.dataService.nextMessage({ action: true });
          this.getStakeHolder();
        }
        if (selectedCustomIds.length > 0) {
          // alert('idsss custom')
          this.dataService.nextMessage({ action: true });
          this.getStakeHolder();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveSelected(id: number, isCustom: boolean) {
    this.isLoading = true;
    const payload = {
      actionId: id,
      isCustom,
    };
    this.http.post(`${baseUrl}/selectedaction/add-sel`, payload).subscribe(
      (res: any) => {
        if (isCustom) {
          this.selectedActionsCustom.add(id);
          this.selectedActionsIndexCustom.delete(
            Array.from(this.selectedActionsCustom.values()).indexOf(id)
          );
          this.selectedInvite = id;
          this.sendDataService();
          this.actionOut.emit(this.selectedActionsCustom);
        } else {
          this.selectedActions.add(id);
          this.selectedActionsIndex.delete(
            Array.from(this.selectedActions.values()).indexOf(id)
          );
          this.selectedInvite = id;
          this.sendDataService();
          this.actionOut.emit(this.selectedActions);
        }
        this.isLoading = false;
      },
      (err) => console.log(err)
    );
  }
  deleteSelected(id: number, index: number, isCustom: boolean) {
    this.isLoading = true;
    if (isCustom) {
      this.http.delete(`${baseUrl}/selectedaction/custom/${id}`).subscribe(
        (res: any) => {
          this.selectedActionsCustom.delete(id);
          this.selectedActionsIndexCustom.delete(index);
          this.sendDataService();
          this.actionOut.emit(this.selectedActionsCustom);
          this.isLoading = false;
        },
        (err) => console.log(err)
      );
    } else {
      this.http.delete(`${baseUrl}/selectedaction/${id}`).subscribe(
        (res: any) => {
          this.selectedActions.delete(id);
          this.selectedActionsIndex.delete(index);
          this.sendDataService();
          this.actionOut.emit(this.selectedActions);
          this.isLoading = false;
        },
        (err) => console.log(err)
      );
    }
  }
  selectAction(action: Action, index: number) {
    console.log(action);
    const isCustom = false;
    if ((this.selectedActions.size + this.selectedActionsCustom.size) === this.maxSelection) {
      if (this.selectedActions.has(action.id)) {
        // alert('first')
        this.deleteSelected(action.id, index, isCustom);
      }
    } else {
      if (this.selectedActions.has(action.id)) {
       if(this.dialogValue == true){
        // this.saveSelected(action.id, isCustom);
        return;
       }
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
  // selectAction(action: Action, index: number) {
  //   console.log(action);
  //   const isCustom = false;
  //   if ((this.selectedActions.size + this.selectedActionsCustom.size) === this.maxSelection) {
  //     if (this.selectedActions.has(action.id)) {
  //       this.deleteSelected(action.id, index, isCustom);
  //     }
  //   } else {
  //     if (this.selectedActions.has(action.id)) {
  //       this.deleteSelected(action.id, index, isCustom);
  //     } else {
  //       alert('kyu calll')
  //       this.saveSelected(action.id, isCustom);
  //     }

  //     if (this.selectedActionsIndex.has(index)) {
  //       this.selectedActionsIndex.delete(index);
  //     } else {
  //       this.selectedActionsIndex.add(index);
  //     }
  //   }
  // }
  selectActionCustom(action: Action, index: number) {
    console.log('action', action)
    const isCustom = true;
    if ((this.selectedActions.size + this.selectedActionsCustom.size) === this.maxSelection) {
      if (this.selectedActionsCustom.has(action.id)) {
        this.deleteSelected(action.id, index, isCustom);
      }
    } else {
      if (this.selectedActionsCustom.has(action.id)) {
        if(this.dialogValue == true){
          // this.saveSelected(action.id, isCustom);
          return;
         }
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
      this.dataService.nextMessage({ action: true });
    } else {
      this.dataService.nextMessage({ action: false });
    }
  }
  showDescription(id: number) {
    console.log('id', id)
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

  openInvite(): void {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      width: '75vw',
      maxWidth: '75vw',
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  grayClicked() {
    this.dataService.nextMessage({
      actionGray: false,
      behaviourGray: true,
      outcomeGray: true,
    });
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  expandAll() {
    if (this.shownAction.size === this.actions.length && this.shownActionCustom.size === this.customActions.length) {
      this.shownAction.clear();
      this.shownActionCustom.clear();
    } else {
      const actionIds = this.actions.map((o) => o.id);
      const customActionIds = this.customActions.map((o) => o.id);
      this.shownAction = new Set(actionIds);
      this.shownActionCustom = new Set(customActionIds);
    }
  }

  getStakeHolder() {
    // tslint:disable-next-line:max-line-length
    this.http.get(`${baseUrl}/actionstakeholder/get`).subscribe(
      (res: any) => {
        this.stakeholder = res.data;
        console.log('@@@@@@@@@@@@@@@@@@@@@@@', this.stakeholder, this.actions);
        this.actions = this.actions.map((o) => {
          console.log('o', o);
          return {
            ...o,
            actionStakeHolder: this.stakeholder.filter(
              (el) => el.selectedActionId === o.selectedActionId

            ),


          };

        });
        console.log('actions', this.actions, this.stakeholder, "ddd",);


        this.customActions = this.customActions.map((o) => {
          return {
            ...o,
            actionStakeHolder: this.stakeholder.filter(
              (el) => el.selectedActionId === o.selectedActionId
            ),
          };
        });
        console.log('this', this.customActions, this.stakeholder, "dddccc");
      },
      (err) => console.log(err)
    );
  }
  addCustom() {
    this.isLoading = true;
    const payload = this.customForm.value;
    this.http.post(`${baseUrl}/customaction/add-action`, payload).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.customActionOut.emit({ added: true });
      },
      (err) => {
        console.log(err);
        this.customActionOut.emit({ added: false });
      }
    );
  }
  addStakeholder(action, index, isCustom) {

    console.log('action', action)
    if (action) {
      this.dialogValue = true;
      if (this.selectedActions.has(action.id)) {
        // alert('dialog')
        // this.saveSelected(action.id, isCustom);
      }
      // this.selectAction(action,index)
      const dialogRef = this.dialog.open(StakeholderComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.dialogValue = false;
        console.log('result', result)
        if (result == undefined) {
          return;
        }
        else {
          this.formData = result.data;
          console.log('value', this.formData)
          if (this.formData) {
            // alert('hi')
            this.storeStakeHolder(action, index, isCustom);
          }
        }


      });
    }

  }
  addCustomStakeholder(action, index, isCustom) {
    console.log('action', action)
    if (action) {
      this.dialogValue = true;
      if (this.selectedActionsCustom.has(action.id)) {
        // alert('dialog')
        // this.saveSelected(action.id, isCustom);
      }
      // this.selectAction(action,index)
      const dialogRef = this.dialog.open(StakeholderComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.dialogValue = false;
        console.log('result', result)
        if (result == undefined) {
          return;
        }
        else {
          this.formData = result.data;
          console.log('value', this.formData)
          if (this.formData) {
            // alert('hi')
            this.storeStakeHolder(action, index, isCustom);
          }
        }


      });
    }
  }



  storeStakeHolder(action, index, isCustom) {
    console.log('action', action, isCustom)
    if (!this.selectedActions.has(action.id) && isCustom == false) {
      this._snackBar.open('Please select an action to add stakeholder', '', {
        duration: 3000,
      });
      return;
    }
    if (!this.selectedActionsCustom.has(action.id) && isCustom == true) {
      this._snackBar.open('Please select an action to add stakeholder', '', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;
    const payload = this.formData;
    payload.actionId = action.id;
    payload.isCustom = isCustom;

    this.http.post(`${baseUrl}/actionstakeholder/add-sel`, payload).subscribe(
      (res: any) => {

        if (!isCustom) {
          if (
            this.actions[index].actionStakeHolder &&
            this.actions[index].actionStakeHolder.length > 0
          ) {
            this.actions[index].actionStakeHolder.push(payload);
            console.log('thi', this.actions);

          } else {
            this.actions[index].actionStakeHolder = [payload];
          }
        } else {
          if (
            this.customActions[index].actionStakeHolder &&
            this.customActions[index].actionStakeHolder.length > 0
          ) {
            this.customActions[index].actionStakeHolder.push(payload);
          } else {
            this.customActions[index].actionStakeHolder = [payload];
          }
        }
        this.getcachindData();
        // this.ngOnInit();
        //  window.location.reload();
        this.isLoading = false;
      },
      (err) => {
        console.error('errorrrrr', err);
        if (err.status === 400) {
          this._snackBar.open('Duplicate Stakeholders not allowed', '', {
            duration: 3000,
          });
        }
        this.isLoading = false;
      }
    );
  }
  clearForm() {
    this.stakeholderForm.reset();
  }
  clearCustomForm() {
    this.customForm.reset();
  }

  next() {
    this.showDone = true;
    this.dataService.nextMessage({
      actionGray: true,
      behaviourGray: false,
      outcomeGray: true,
      sprint: true,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      crew: false,
      sprintShow: false,
      action: false,
      behaviour: true,
      step: 2,

    });
  }
  getcachindData() {
    this.http
      .get(`${baseUrl}/development/get-cache-data?type=stakeholder`)
      // GET http://localhost:9000/development/get-cache-data?type=(sprintcrew OR nominee OR stakeholder)
      .subscribe(
        (res: any) => {
          console.log('cache', res);
          this.stakeCachingData = res.data;
          // window.location.reload();
          console.log('cache data', this.stakeCachingData);
        },
        (err) => console.log(err)
      );
  }
  onSelectionChange(event) {
    console.log('event', event)
    this.stakeholderForm.patchValue({
      email: event.email,
      name: event.name
    })
  }
  onEmailChange(event) {
    console.log('event', event)
    this.stakeholderForm.patchValue({
      email: event.email,
      name: event.name
    })
  }

}
