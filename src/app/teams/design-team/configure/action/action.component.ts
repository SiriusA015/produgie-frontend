import { CustomValidators } from 'ngx-custom-validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Action } from './../../../../../models/Action';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import * as _ from 'lodash';
import { DataService } from 'src/app/design/service/data.service';
import { StakeholderComponent } from 'src/app/design/components/stakeholder/stakeholder.component';
import { InviteDialogComponent } from 'src/app/design/components/configure-sprint/modals/invite-dialog/invite-dialog.component';
import { AddLeadAddStakeholderComponent } from '../add-lead-add-stakeholder/add-lead-add-stakeholder.component';
import { DesignService } from '../../design.service';
import { ToastrService } from 'ngx-toastr';

const baseUrl = environment.baseurl;

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @ViewChildren('menuTrigger') menu: QueryList<MatMenuTrigger>;
  @ViewChild('formmenu') formmenu;
  isOpen = false;
  sprintId;
  selectedInvite = null;
  @Input() selectedActions: Set<number> = new Set([]);
  selectedActionsIndex: Set<number> = new Set([]);
  @Input() selectedActionsCustom: Set<number> = new Set([]);
  selectedActionsIndexCustom: Set<number> = new Set([]);
  shownAction: Set<number> = new Set([]);
  shownActionCustom: Set<number> = new Set([]);
  isChecked = false;
  maxSelection = 6;
  stakeholder = [];
  comp = StakeholderComponent;
  stakeholderForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, CustomValidators.email]),
  });
  customForm = new FormGroup({
    label: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    // sprint_id: new FormControl(localStorage.getItem('sprint_Id'), Validators.required),
    // user_id: new FormControl(localStorage.getItem('user_id'), Validators.required),
    // assessment_id: new FormControl(89, Validators.required),
  });
  isLoading = false;
  @Input() actions: Action[];
  @Input() customActions: Action[] = [];
  @Input() assessmentId;
  @Input() grayOverlay;
  @Input() previousSelectedActions;
  @Output() actionOut: EventEmitter<any> = new EventEmitter();
  @Output() customActionOut: EventEmitter<any> = new EventEmitter();
  showDone: boolean = true;
  @ViewChild('secondDialog', { static: true }) secondDialog;
  array1: any;
  stakeCachingData: any;
  formData: any;
  dialogValue: boolean = false;
  selectActionId: number;
  team_id: string;
  sprint_id: string;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private dataService: DataService,
    private designService: DesignService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.showDone = true;
  }

  ngOnChanges() {
    this.getStakeHolder();
    this.actionOut.emit(this.selectedActions);
  }

  getSelected() {

  }

  saveSelected(id: number, isCustom: boolean) {
    this.isLoading = true;
    const payload = {
      actionId: id,
      isCustom,
    };

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
        (err) => {
          this.selectedActionsCustom.delete(id);
          this.selectedActionsIndexCustom.delete(index);
          this.sendDataService();
          this.actionOut.emit(this.selectedActionsCustom);
          this.isLoading = false;
        }
      );
    } else {
      this.http.delete(`${baseUrl}/selectedaction/${id}`).subscribe(
        (res: any) => {
          this.selectedActions.delete(id);
          this.selectedActionsIndex.delete(index);
          this.selectActionId = null;
          this.sendDataService();
          this.actionOut.emit(this.selectedActions);
          this.isLoading = false;
        },
        (err) => {
          this.selectedActions.delete(id);
          this.selectedActionsIndex.delete(index);
          this.selectActionId = null;
          this.sendDataService();
          this.actionOut.emit(this.selectedActions);
          this.isLoading = false;
        }
      );
    }
  }
  selectAction(action: Action, index: number) {
    this.selectActionId = action.id;
    const isCustom = false;
    if ((this.selectedActions.size + this.selectedActionsCustom.size) === this.maxSelection) {
      if (this.selectedActions.has(action.id)) {
        this.deleteSelected(action.id, index, isCustom);
      }
    } else {
      if (this.selectedActions.has(action.id)) {
        if (this.dialogValue == true) {
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

  selectActionCustom(action: Action, index: number) {
    const isCustom = true;
    if ((this.selectedActions.size + this.selectedActionsCustom.size) === this.maxSelection) {
      if (this.selectedActionsCustom.has(action.id)) {
        this.deleteSelected(action.id, index, isCustom);
      }
    } else {
      if (this.selectedActionsCustom.has(action.id)) {
        if (this.dialogValue == true) {
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
    this.team_id = localStorage.getItem('selectedTeamId');
    this.sprint_id = localStorage.getItem('sprint_Id');
    let params = {
      team_id: this.team_id,
      sprint_id: this.sprint_id
    };
    this.designService.getStakeHolder(params).subscribe(
      (res: any) => {
        this.stakeholder = res;

        this.actions = this.actions.map((o) => {
          return {
            ...o,
            actionStakeHolder: this.stakeholder.filter(
              (el) => el.selected_action_id === o.id

            ),
          };
        });
        this.customActions = this.customActions.map((o) => {
          return {
            ...o,
            actionStakeHolder: this.stakeholder.filter(
              (el) => el.selectedActionId === o.selectedActionId
            ),
          };
        });
      },
      (err) => console.log(err)
    );
  }

  addCustom() {
    this.isLoading = true;
    const payload = {
      label: this.customForm.value.label,
      description: this.customForm.value.description,
      sprint_id: localStorage.getItem('sprint_Id'),
      assessment_id: localStorage.getItem('assesmentId'),
      team_id: localStorage.getItem('selectedTeamId')
    };

    this.designService.addCustomeAction(payload).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.customActionOut.emit({ added: true });
        this.toastr.success('Success', "Custom Added Successfully", {
          timeOut: 3000,
        });
      },
      (err) => {
        this.toastr.error('error', "Something Went Wrong", {
          timeOut: 3000,
        });
        this.customActionOut.emit({ added: false });
      }
    );
  }

  deleteAction(action) {
    this.isLoading = true;
    this.designService.deleteCustomAction(action.id).subscribe((res: any) => {
      this.isLoading = false;
      this.customActionOut.emit({ added: true });
      this.toastr.success('Success', "Custom Deleted Successfully", {
        timeOut: 3000,
      });
    },
      err => {
        console.log(err);
        this.customActionOut.emit({ added: false });
      });
  }

  addStakeholder(action, index, isCustom) {
    console.log(action);

    if (action) {
      this.dialogValue = true;

      if (!this.selectedActions.has(action.id)) {
        return;
      }
      const dialogRef = this.dialog.open(AddLeadAddStakeholderComponent, {
        width: '600px',
        data: action
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.dialogValue = false;
        this.getStakeHolder();
      });
    }
  }

  addCustomStakeholder(action, index, isCustom) {
    if (action) {
      this.dialogValue = true;
      if (this.selectedActionsCustom.has(action.id)) {
      }
      const dialogRef = this.dialog.open(AddLeadAddStakeholderComponent, {
        width: '600px',
        data: this.selectedActionsCustom.has(action.id)
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.dialogValue = false;
        if (result == undefined) {
          return;
        }
        else {
          this.formData = result.data;
          if (this.formData) {
            // this.storeStakeHolder(action, index, isCustom);
          }
        }
      });
    }
  }



  // storeStakeHolder(action, index, isCustom) {
  //   if (!this.selectedActions.has(action.id) && isCustom == false) {
  //     this._snackBar.open('Please select an action to add stakeholder', '', {
  //       duration: 3000,
  //     });
  //     return;
  //   }
  //   if (!this.selectedActionsCustom.has(action.id) && isCustom == true) {
  //     this._snackBar.open('Please select an action to add stakeholder', '', {
  //       duration: 3000,
  //     });
  //     return;
  //   }
  //   this.isLoading = true;
  //   const payload = this.formData;
  //   payload.actionId = action.id;
  //   payload.isCustom = isCustom;
  //   this.http.post(`${baseUrl}/actionstakeholder/add-sel`, payload).subscribe(
  //     (res: any) => {

  //       if (!isCustom) {
  //         if (
  //           this.actions[index].actionStakeHolder &&
  //           this.actions[index].actionStakeHolder.length > 0
  //         ) {
  //           this.actions[index].actionStakeHolder.push(payload);
  //         } else {
  //           this.actions[index].actionStakeHolder = [payload];
  //         }
  //       } else {
  //         if (
  //           this.customActions[index].actionStakeHolder &&
  //           this.customActions[index].actionStakeHolder.length > 0
  //         ) {
  //           this.customActions[index].actionStakeHolder.push(payload);
  //         } else {
  //           this.customActions[index].actionStakeHolder = [payload];
  //         }
  //       }
  //       this.getcachindData();
  //       this.isLoading = false;
  //     },
  //     (err) => {
  //       console.error('errorrrrr', err);
  //       if (err.status === 400) {
  //         this._snackBar.open('Duplicate Stakeholders not allowed', '', {
  //           duration: 3000,
  //         });
  //       }
  //       this.isLoading = false;
  //     }
  //   );
  // }
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
      .subscribe(
        (res: any) => {
          this.stakeCachingData = res.data;
        },
        (err) => console.log(err)
      );
  }
  onSelectionChange(event) {
    this.stakeholderForm.patchValue({
      email: event.email,
      name: event.name
    })
  }
  onEmailChange(event) {
    this.stakeholderForm.patchValue({
      email: event.email,
      name: event.name
    })
  }

}
