import { ConfigService } from './../../../shared/service/config.service';
import { DataService } from './../../service/data.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Sprint } from './../../../../models/Sprint';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
const baseUrl = environment.baseurl;
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangeSprintDialogComponent } from '../../../design/components/Notification-Dialog/change-sprint-dialog/change-sprint-dialog.component';
import { DesignService } from '../../service/design/design.service';

@Component({
  selector: 'app-configure-sprint',
  templateUrl: './configure-sprint.component.html',
  styleUrls: ['./configure-sprint.component.scss'],
})
export class ConfigureSprintComponent implements OnInit {
  clientId = 1;
  userId = 1;
  data: any;
  assessmentId: number;
  message: any;
  userSprint: any;
  filterForm: FormGroup;
  value = 0;
  highValue = 12;
  sprintDuration = [];
  // sprintDuration = [4, 8, 12];
  options: Options = {
    floor: 4,
    ceil: 12,
    step: 4,
    showTicks: true,
  };
  schedule = 12;
  sprints: Sprint[] = [];
  selectedCapability;
  selectedActions = null;
  oldSelectedActions = null;
  oldDuration: number = 0;
  isFilterOpen = false;
  isScheduleOpen = false;
  glfChecked = true;
  selectedvalue: any;
  @ViewChild(MatSelect) matSelect: MatSelect;
  Theme: Array<any> = [
    {
      checked: false,
      name: 'Digital Leader',
      value: 'digitalleader',
      info: 'Sprints that develop technology or digital leadership skills',
    },
    {
      checked: false,
      name: 'Change Leader',
      value: 'changeleader',
      info: 'Sprints that develop change leadership skills',
    },
    {
      checked: false,
      name: 'Communicator',
      value: 'communicator',
      info: 'Sprints that develop communication skills',
    },
  ];
  Level: Array<any> = [
    {
      checked: false,
      name: 'Individual Contributor',
      value: 'ic',
      info: 'Sprints that develop technology or digital leadership skills',
    },
    {
      checked: false,
      name: 'People Manager',
      value: 'pm',
      info: 'Sprints that develop technology or digital leadership skills',
    },
    {
      checked: false,
      name: 'Manager of Manager',
      value: 'mm',
      info: 'Sprints that develop technology or digital leadership skills',
    },
    {
      checked: false,
      name: 'Business Unit Manager',
      value: 'bu',
      info: 'Sprints that develop technology or digital leadership skills',
    },
    {
      checked: false,
      name: 'Chief Executive Officer',
      value: 'ceo',
      info: 'Sprints that develop technology or digital leadership skills',
    },
  ];
  shownDescription: Set<number> = new Set([]);
  selectedPriority: any;
  themeArray: FormArray;
  array1: any[];
  array2: any[];
  clearDiv: boolean = false;
  levelArray1 = [];
  isEditState: boolean;
  // tslint:disable-next-line:max-line-length
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private designService: DesignService
  ) {
    this.filterForm = this.fb.group({
      label: this.fb.control(null),
      themeArray: this.fb.array([]),
      levelArray: this.fb.array([]),
      isGlf: this.fb.control(false),
    });
  }

  ngOnInit(): void {

    if (environment.simulator == true) {
      this.sprintDuration = [4, 8, 12];
    } else {
      this.sprintDuration = [1, 4, 8, 12];
    }

    this.clearDiv = false;
    this.getSprint();
    this.dataService.sharedMessage.subscribe(
      (message) => {
        this.message = message;
        this.isEditState = this.message.isEditState;
      }
    );
    // this.getAssessment();
    this.dataService.nextMessage({
      faddev: false,
      fadfocus: false,
      step: 2,
      sprintShow: true,
      show: true,
      action: false,
    });
  }

  setFilterToNull() {
    this.value = 4;
    this.highValue = 12;
    this.filterForm.get('isGlf').setValue(false);
    (this.filterForm.controls['themeArray'] as FormArray).clear();
    (this.filterForm.controls['levelArray'] as FormArray).clear();
    this.Theme = [
      {
        checked: false,
        name: 'Digital Leader',
        value: 'digitalleader',
        info: 'Sprints that develop technology or digital leadership skills',
      },
      {
        checked: false,
        name: 'Change Leader',
        value: 'changeleader',
        info: 'Sprints that develop change leadership skills',
      },
      {
        checked: false,
        name: 'Communicator',
        value: 'communicator',
        info: 'Sprints that develop communication skills',
      },
    ];
    this.Level = [
      {
        checked: false,
        name: 'Individual Contributor',
        value: 'ic',
        info: 'View sprints appropriate for a level of management',
      },
      {
        checked: false,
        name: 'People Manager',
        value: 'pm',
        info: '',
      },
      {
        checked: false,
        name: 'Manager of Manager',
        value: 'mm',
        info: '',
      },
      {
        checked: false,
        name: 'Business Unit Manager',
        value: 'bu',
        info: '',
      },
      {
        checked: false,
        name: 'Chief Executive Officer',
        value: 'ceo',
        info: '',
      },
    ];
  }
  selectAction(action: any) {
    if (this.selectedActions === action.id) {
      this.selectedActions = null;
      this.schedule = 12;
    } else {
      this.selectedActions = action.id;
      this.schedule = action.defaultLength;
    }

    this.designService.configureSprint({sprintId: this.selectedActions, schedule: this.schedule});
  }
  getSprint() {
    // this.setFilterToNull();
    this.configService.setConfig({ isLoader: true });
    // this.filterForm.reset();
    this.http.get(`${baseUrl}/sprint/all`).subscribe(
      (res: any) => {
        this.selectedCapability = res.data.capability;
        this.sprints = res.data.sprints.reverse().map((o: Sprint) => {
          const returnObj: Sprint = {
            ...o,
            icon: o.theme1 ? o.theme1 : 'Empty',
            // color: '#3AA76D',
            color: '#278ce9',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          return returnObj;
        });
        if (res.data.userSprint) {
          this.configService.setConfig({ isLoader: false });
          this.selectedActions = res.data.userSprint.sprintId;
          this.oldSelectedActions = res.data.userSprint.sprintId;
          this.oldDuration = res.data.userSprint.duration;
          console.log('this is this.schedule', res.data.userSprint)
          this.changeSchedule(
            this.selectedActions,
            res.data.userSprint.duration
          );
          this.dataService.nextMessage({ sprint: true });
        }
        this.isFilterOpen = false;
        this.filterForm.get('label').setValue(null);
        this.configService.setConfig({ isLoader: false });
      },
      (err) => console.log(err)
    );
  }

  openFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }
  changeSchedule(sprintId: number, schedule: string, userInput?: boolean) {
    this.schedule = Number(schedule);
    const index = _.findIndex(this.sprints, (o) => o.id === sprintId);
    this.sprints[index].defaultLength = schedule;
    this.isScheduleOpen = false;

    if (userInput) {
      this.designService.configureSprint({sprintId: this.selectedActions, schedule: this.schedule});
    }
   }
  changeScheduleIsOpen() {
    this.isScheduleOpen = !this.isScheduleOpen;
  }
  onLevelCheckboxChange(e) {
    const levelArray: FormArray = this.filterForm.get(
      'levelArray'
    ) as FormArray;
    if (e.target.checked) {
      levelArray.push(new FormControl(e.target.value));
      const t = _.findIndex(this.Level, (o) => o.value === e.target.value);
      this.Level[t].checked = true;
      for (let item of this.Level) {
        if (item.checked == true) {
          this.filterForm.value.levelArray.push(item.value);
        }
        if (item.checked == false) {
          this.filterForm.value.levelArray = [
            ...new Set(this.filterForm.value.levelArray),
          ];
          let i = this.filterForm.value.levelArray.indexOf(item.value);
          if (i > -1) {
            this.filterForm.value.levelArray.splice(i, 1);
          }
        }
      }
      this.filterForm.value.levelArray = [
        ...new Set(this.filterForm.value.levelArray),
      ];
      this.array1 = this.Level;
      this.clearDiv = true;
      if (this.array1.length == 0) {
        this.clearDiv = false;
      }
    } else {
      const t = _.findIndex(this.Level, (o) => o.value === e.target.value);
      this.Level[t].checked = false;
      let i = 0;
      levelArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          levelArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onThemeCheckboxChange(e) {
    const themeArray: FormArray = this.filterForm.get(
      'themeArray'
    ) as FormArray;
    if (e.target.checked) {
      themeArray.push(new FormControl(e.target.value));
      const t = _.findIndex(this.Theme, (o) => o.value === e.target.value);
      this.Theme[t].checked = true;
      for (let item of this.Theme) {
        if (item.checked == true) {
          this.filterForm.value.themeArray.push(item.value);
        }
        if (item.checked == false) {
          this.filterForm.value.themeArray = [
            ...new Set(this.filterForm.value.themeArray),
          ];
          let i = this.filterForm.value.themeArray.indexOf(item.value);
          if (i > -1) {
            this.filterForm.value.themeArray.splice(i, 1);
          }
        }
      }
      this.filterForm.value.themeArray = [
        ...new Set(this.filterForm.value.themeArray),
      ];

       this.array2 = this.Theme;
      this.clearDiv = true;
      if (this.array2.length == 0) {
        this.clearDiv = false;
      }
    } else {
      const t = _.findIndex(this.Theme, (o) => o.value === e.target.value);
      this.Theme[t].checked = false;
      let i = 0;
      themeArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          themeArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  remove(event) {
    for (let data of this.array1) {
      if (event.value === data.value) {
        if (data.checked == true) {
          data.checked = false;
        }
      }
    }

    this.configService.setConfig({ isLoader: true });
    let filterPayload: any = this.filterForm.value;
    filterPayload.durationLow = this.value;
    filterPayload.durationHigh = this.highValue;
    if (filterPayload.label === '') {
      filterPayload.label = null;
    }
    if (filterPayload.theme === '') {
      filterPayload.theme = null;
    }
    filterPayload.isDigitalLeader =
      filterPayload.themeArray.indexOf('digitalleader') !== -1
        ? 'Digital Leader'
        : null;
    filterPayload.isChangeLeader =
      filterPayload.themeArray.indexOf('changeleader') !== -1
        ? 'Change Leader'
        : null;
    filterPayload.isCommunicator =
      filterPayload.themeArray.indexOf('communicator') !== -1
        ? 'Communicator'
        : null;
    console.log('filter array before', filterPayload.levelArray);
    this.filterForm.value.levelArray = [
      ...new Set(this.filterForm.value.levelArray),
    ];
    let index = filterPayload.levelArray.indexOf(event.value);
    console.log('@#$', index);
    if (index > -1) {
      filterPayload.levelArray.splice(index, 1);
    }
    console.log('filter array', filterPayload.levelArray);
    filterPayload.ic =
      filterPayload.levelArray.indexOf('ic') !== -1 ? true : null;
    filterPayload.pm =
      filterPayload.levelArray.indexOf('pm') !== -1 ? true : null;
    filterPayload.mm =
      filterPayload.levelArray.indexOf('mm') !== -1 ? true : null;
    filterPayload.bu =
      filterPayload.levelArray.indexOf('bu') !== -1 ? true : null;
    filterPayload.ceo =
      filterPayload.levelArray.indexOf('ceo') !== -1 ? true : null;
    if (
      filterPayload.levelArray.length == 0 &&
      filterPayload.themeArray.length == 0
    ) {
      this.clear();
      return;
    }
    this.filterForm.value.levelArray = [
      ...new Set(this.filterForm.value.levelArray),
    ];

    filterPayload.recommended = filterPayload.isGlf === true ? true : null;
    filterPayload = JSON.stringify(filterPayload);
    console.log('@@@@@@@', filterPayload);

    this.http.get(`${baseUrl}/sprint/all?filter=${filterPayload}`).subscribe(
      (res: any) => {
        console.log('res', res);
        this.configService.setConfig({ isLoader: false });
        // this.isFilterOpen = !this.isFilterOpen;
        this.sprints = res.data.sprints.reverse().map((o: Sprint) => {
          const returnObj: Sprint = {
            ...o,
            icon: o.theme1 ? o.theme1 : 'Empty',
            // color: '#fc9f6a',
            color: '#278ce9',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          // console.log('@@', returnObj, this.sprints)
          return returnObj;
        });
        if (res.data.userSprint) {
          this.selectedActions = res.data.userSprint.sprintId;
          this.changeSchedule(
            this.selectedActions,
            res.data.userSprint.duration
          );
          this.dataService.nextMessage({ sprint: true });
        }
      },
      (err) => console.log(err)
    );
  }
  removeTheme(event) {
    console.log('theme', this.array2, event, this.filterForm.value.themeArray);
    for (let data of this.array2) {
      if (event.value === data.value) {
        if (data.checked == true) {
          data.checked = false;
        }
      }
    }

    this.configService.setConfig({ isLoader: true });
    let filterPayload: any = this.filterForm.value;
    filterPayload.durationLow = this.value;
    filterPayload.durationHigh = this.highValue;
    if (filterPayload.label === '') {
      filterPayload.label = null;
    }
    if (filterPayload.theme === '') {
      filterPayload.theme = null;
    }
    this.filterForm.value.themeArray = [
      ...new Set(this.filterForm.value.themeArray),
    ];
    let index = filterPayload.themeArray.indexOf(event.value);
    console.log('index', index);
    if (index > -1) {
      filterPayload.themeArray.splice(index, 1);
    }
    filterPayload.isDigitalLeader =
      filterPayload.themeArray.indexOf('digitalleader') !== -1
        ? 'Digital Leader'
        : null;
    filterPayload.isChangeLeader =
      filterPayload.themeArray.indexOf('changeleader') !== -1
        ? 'Change Leader'
        : null;
    filterPayload.isCommunicator =
      filterPayload.themeArray.indexOf('communicator') !== -1
        ? 'Communicator'
        : null;
    filterPayload.ic =
      filterPayload.levelArray.indexOf('ic') !== -1 ? true : null;
    filterPayload.pm =
      filterPayload.levelArray.indexOf('pm') !== -1 ? true : null;
    filterPayload.mm =
      filterPayload.levelArray.indexOf('mm') !== -1 ? true : null;
    filterPayload.bu =
      filterPayload.levelArray.indexOf('bu') !== -1 ? true : null;
    filterPayload.ceo =
      filterPayload.levelArray.indexOf('ceo') !== -1 ? true : null;
    if (
      filterPayload.levelArray.length == 0 &&
      filterPayload.themeArray.length == 0
    ) {
      this.clear();
      return;
    }
    this.filterForm.value.themeArray = [
      ...new Set(this.filterForm.value.themeArray),
    ];

    console.log(
      'this.filterForm.value.themeArray',
      this.filterForm.value.themeArray
    );
    filterPayload.recommended = filterPayload.isGlf === true ? true : null;
    filterPayload = JSON.stringify(filterPayload);

    this.http.get(`${baseUrl}/sprint/all?filter=${filterPayload}`).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.sprints = res.data.sprints.reverse().map((o: Sprint) => {
          const returnObj: Sprint = {
            ...o,
            icon: o.theme1 ? o.theme1 : 'Empty',
            // color: '#fc9f6a',
            color: '#278ce9',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          // console.log('@@', returnObj, this.sprints)
          return returnObj;
        });
        if (res.data.userSprint) {
          this.selectedActions = res.data.userSprint.sprintId;
          this.changeSchedule(
            this.selectedActions,
            res.data.userSprint.duration
          );
          this.dataService.nextMessage({ sprint: true });
        }
      },
      (err) => console.log(err)
    );
  }
  filterOpened(e) {
    this.selectedvalue = null;
    console.log(e);
    console.log('here');
    if (e) {
      document.getElementsByTagName('body')[0].style.position = 'fixed';
    } else {
      document.getElementsByTagName('body')[0].style.position = 'static';
    }
  }
  storeSprintFad() {
    if (this.selectedActions) {

      if (this.selectedActions === this.oldSelectedActions && this.oldDuration === this.schedule){
        this.configService.setConfig({ isLoader: false });
        this.dataService.nextMessage({
          isEdit: false,
          isResetDesignEdit: true,
        });
        this.designService.configureSprint({sprintId: this.selectedActions, schedule: this.schedule});
        this.router.navigate(['/design/sprint']);
        return;
      }
      if (!this.message.modalState){
        this.notifications()
      }else{
        this.configService.setConfig({ isLoader: true });
      const payload = {
        sprintId: this.selectedActions,
        duration: Number(this.schedule),
      };
      this.http
        .post(`${baseUrl}/selectedsprintfad/add-sprintfad`, payload)
        .subscribe(
          (res: any) => {
            this.configService.setConfig({ isLoader: false });
            this.dataService.nextMessage({
              isEdit: false,
              isResetDesignEdit: true,
            });
            this.designService.configureSprint({sprintId: this.selectedActions, schedule: this.schedule});
            this.router.navigate(['/design/sprint']);
          },
          (err) => console.log(err)
        );
      }
    }else{
      this._snackBar.open('Please select one sprint', '', {
        duration: 3000,
      });
    }
  }

  saveSprintFad() {
    if (this.selectedActions) {
      if (this.selectedActions !== this.oldSelectedActions || this.oldDuration !== this.schedule) {
        this._snackBar.open('Please reset next pages', '', {
          duration: 3000,
        });
        return;
      }else{
        this.configService.setConfig({ isLoader: false });
          this.dataService.nextMessage({
            isEdit: false
          });
          this.designService.configureSprint({sprintId: this.selectedActions, schedule: this.schedule});
          this.router.navigate(['/design/sprint-final']);
          return;
      }
    }else{
      this._snackBar.open('Please select one sprint', '', {
        duration: 3000,
      });
    }
  }

  showDescription(id: number) {
    if (this.shownDescription.has(id)) {
      this.shownDescription.delete(id);
    } else {
      this.shownDescription.add(id);
    }
  }
  expandAll() {
    if (this.shownDescription.size === this.sprints.length) {
      this.shownDescription.clear();
    } else {
      const actionIds = this.sprints.map((o) => o.id);
      this.shownDescription = new Set(actionIds);
    }
  }
  applyFilter() {
    this.configService.setConfig({ isLoader: true });
    // this.filterForm.reset();
    this.matSelect.close();
    this.filterForm.value.levelArray = [
      ...new Set(this.filterForm.value.levelArray),
    ];
    this.filterForm.value.themeArray = [
      ...new Set(this.filterForm.value.themeArray),
    ];
    console.log('filter value', this.filterForm.value.levelArray);

    let filterPayload: any = this.filterForm.value;
    filterPayload.durationLow = this.value;
    filterPayload.durationHigh = this.highValue;
    if (filterPayload.label === '') {
      filterPayload.label = null;
    }
    if (filterPayload.theme === '') {
      filterPayload.theme = null;
    }
    filterPayload.isDigitalLeader =
      filterPayload.themeArray.indexOf('digitalleader') !== -1
        ? 'Digital Leader'
        : null;
    filterPayload.isChangeLeader =
      filterPayload.themeArray.indexOf('changeleader') !== -1
        ? 'Change Leader'
        : null;
    filterPayload.isCommunicator =
      filterPayload.themeArray.indexOf('communicator') !== -1
        ? 'Communicator'
        : null;

    filterPayload.ic =
      filterPayload.levelArray.indexOf('ic') !== -1 ? true : null;
    filterPayload.pm =
      filterPayload.levelArray.indexOf('pm') !== -1 ? true : null;
    filterPayload.mm =
      filterPayload.levelArray.indexOf('mm') !== -1 ? true : null;
    filterPayload.bu =
      filterPayload.levelArray.indexOf('bu') !== -1 ? true : null;
    filterPayload.ceo =
      filterPayload.levelArray.indexOf('ceo') !== -1 ? true : null;
    filterPayload.recommended = filterPayload.isGlf === true ? true : null;
    filterPayload = JSON.stringify(filterPayload);
    console.log('filterPayload', filterPayload);
    this.http.get(`${baseUrl}/sprint/all?filter=${filterPayload}`).subscribe(
      (res: any) => {
        console.log('res', res);
        this.configService.setConfig({ isLoader: false });
        // this.isFilterOpen = !this.isFilterOpen;
        this.sprints = res.data.sprints.reverse().map((o: Sprint) => {
          const returnObj: Sprint = {
            ...o,
            icon: o.theme1 ? o.theme1 : 'Empty',
            // color: '#fc9f6a',
            color: '#278ce9',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          // console.log('@@', returnObj, this.sprints)
          return returnObj;
        });
        if (res.data.userSprint) {
          this.selectedActions = res.data.userSprint.sprintId;
          this.changeSchedule(
            this.selectedActions,
            res.data.userSprint.duration
          );
          this.dataService.nextMessage({ sprint: true });
        }
      },
      (err) => console.log(err)
    );
  }
  clear() {
    this.clearDiv = false;
    this.selectedvalue = null;
    for (let data of this.Level) {
      if (data.checked == true) {
        data.checked = false;
      }
    }
    for (let data of this.Theme) {
      if (data.checked == true) {
        data.checked = false;
      }
    }
    const themeArray = (<FormArray>this.filterForm.get('themeArray')).clear();
    const levelArray = (<FormArray>this.filterForm.get('levelArray')).clear();
    this.filterForm.get('isGlf').patchValue(false);
    console.log('filter if', this.filterForm.value);
    this.getSprint();
  }

  notifications() {
    const dialogRef = this.dialog.open(ChangeSprintDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "close"){
        return
      }
      this.configService.setConfig({ isLoader: true });
      const payload = {
        sprintId: this.selectedActions,
        duration: Number(this.schedule),
      };
      this.http
        .post(`${baseUrl}/selectedsprintfad/add-sprintfad`, payload)
        .subscribe(
          (res: any) => {
            this.configService.setConfig({ isLoader: false });
            this.dataService.nextMessage({
              isEdit: false,
              isResetDesignEdit: true,
            });
            this.designService.configureSprint({sprintId: this.selectedActions, schedule: this.schedule});
            this.router.navigate(['/design/sprint']);
          },
          (err) => console.log(err)
        );
      });
  }

  public back() {
    this.designService.configureSprint({sprintId: this.selectedActions, schedule: this.schedule});
    this.router.navigate(['/design/fad-priority']);
  }
}
