import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import _ from 'lodash';
import { Options } from 'ng5-slider';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { Sprint } from 'src/models/Sprint';
import { DesignService } from '../design.service';

@Component({
  selector: 'app-teams-sprint-configure',
  templateUrl: './teams-sprint-configure.component.html',
  styleUrls: ['./teams-sprint-configure.component.scss']
})
export class TeamsSprintConfigureComponent implements OnInit {

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
  isFilterOpen = false;
  isScheduleOpen = false;
  isTrue: Boolean = false;
  glfChecked = true;
  selectedvalue: any;
  @ViewChild(MatSelect) matSelect: MatSelect;
  Theme: Array<any> = [
    {
      checked: false,
      name: 'Working/Functional Team',
      value: 'Working/FunctionalTeam'
    },
    {
      checked: false,
      name: 'Project/Temporary Team',
      value: 'Project/TemporaryTeam'
    },
    {
      checked: false,
      name: 'Managment/Leadership Team',
      value: 'Managment/LeadershipTeam'
    },
  ];
  Level: Array<any> = [
    {
      checked: false,
      name: 'Foundational',
    },
    {
      checked: false,
      name: 'High Performing Team',
    },
    {
      checked: false,
      name: 'Hybrid/Virtual',
    },

  ];
  Library: Array<any> = [
    {
      checked: false,
      name: 'Team Library',
    },
    {
      checked: false,
      name: 'Manager Library',
    },
    {
      checked: false,
      name: 'Company Library',
    },

  ];
  shownDescription: Set<number> = new Set([]);
  selectedPriority: any;
  themeArray: FormArray;
  array1: any[];
  array2: any[];
  clearDiv: boolean = false;
  levelArray1 = [];
  themeArrayData: string;
  levelArrayData: string;
  libraryArrayData: string;
  array3: any[];
  teamId: string;
  sprintDescription: any;
  sprintName: any;
  priorityName: any;

  // tslint:disable-next-line:max-line-length
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private designService: DesignService,
    private configService: ConfigService,
  ) {
    this.filterForm = this.fb.group({
      label: this.fb.control(null),
      themeArray: this.fb.array([]),
      levelArray: this.fb.array([]),
      libraryArray: this.fb.array([]),
      isGlf: this.fb.control(false),
    });
  }

  ngOnInit(): void {
    this.priorityName = localStorage.getItem('priority_name');
    if (environment.simulator == true) {
      this.sprintDuration = [4, 8, 12];
    } else {
      this.sprintDuration = [1, 4, 8, 12];
    }

    this.clearDiv = false;
    this.getSprint();
    this.dataService.sharedMessage.subscribe(
      (message) => (this.message = message)
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
        name: 'Working/Functional Team',
        value: 'Working/Functional Team'
      },
      {
        checked: false,
        name: 'Project/Temporary Team',
        value: 'Project/Temporary Team'
      },
      {
        checked: false,
        name: 'Managment/Leadership Team',
        value: 'Managment/Leadership Team'
      },
    ];
    this.Level = [
      {
        checked: false,
        name: 'Foundational',
      },
      {
        checked: false,
        name: 'High Performing Team',
      },
      {
        checked: false,
        name: 'Hybrid/Virtual',
      },
    ];
    this.Library = [
      {
        checked: false,
        name: 'Team Library',
        value: 'Team Library'
      },
      {
        checked: false,
        name: 'Manager Library',
        value: 'Manager Library'
      },
      {
        checked: false,
        name: 'Company Library',
        value: 'Company Library'
      },

    ];
  }

  selectAction(action: any) {
    this.sprintDescription = action.description;
    this.sprintName = action.sprintName;
    if (this.selectedActions === action.id) {
      this.selectedActions = null;
      this.schedule = 12;
    } else {
      this.selectedActions = action.id;
      this.schedule = action.duration;
    }
  }

  getSprint() {
    this.setFilterToNull();
    this.configService.setConfig({ isLoader: true });
    this.filterForm.reset();
    this.designService.getAllSprint(this.priorityName).subscribe(
      (res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.sprints = res.reverse().map((o: Sprint) => {
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
        this.isFilterOpen = false;
        this.filterForm.get('label').setValue(null);
        this.configService.setConfig({ isLoader: false });
      },
      (err) => {
        this.configService.setConfig({ isLoader: false });
      }
    );
  }
  // call selectedFad for header name

  openFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  changeSchedule(sprintId: number, schedule: string) {
    this.schedule = Number(schedule);
    this.isTrue = true;
    this.isScheduleOpen = !this.isScheduleOpen;
    const index = _.findIndex(this.sprints, (o) => o.id === sprintId);
    this.sprints[index]['duration'] = schedule;
    this.isScheduleOpen = false;
    // let index = this.sprints.filter(o => {
    //   return o.id === sprintId
    // })
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
      const t = _.findIndex(this.Level, (o) => o.name === e.target.value);
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
      this.filterForm.value.levelArray = this.filterForm.value.levelArray.filter(Boolean);
      this.array1 = this.Level;
      this.clearDiv = true;
      // e.stopPropagation();
      if (this.array1.length == 0) {
        this.clearDiv = false;
      }
    } else {
      const t = _.findIndex(this.Level, (o) => o.name === e.target.value);
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

  onLibraryCheckboxChange(e) {
    const libraryArray: FormArray = this.filterForm.get(
      'libraryArray'
    ) as FormArray;
    if (e.target.checked) {
      libraryArray.push(new FormControl(e.target.value));
      const t = _.findIndex(this.Library, (o) => o.value === e.target.value);
      this.Library[t].checked = true;
      for (let item of this.Library) {
        if (item.checked == true) {
          this.filterForm.value.libraryArray.push(item.value);
        }
        if (item.checked == false) {
          this.filterForm.value.libraryArray = [
            ...new Set(this.filterForm.value.libraryArray),
          ];
          let i = this.filterForm.value.libraryArray.indexOf(item.value);
          if (i > -1) {
            this.filterForm.value.libraryArray.splice(i, 1);
          }
        }
      }
      this.filterForm.value.libraryArray = [
        ...new Set(this.filterForm.value.libraryArray),
      ];
      this.array3 = this.Library;
      this.clearDiv = true;
      if (this.array3.length == 0) {
        this.clearDiv = false;
      }
    } else {
      const t = _.findIndex(this.Library, (o) => o.value === e.target.value);
      this.Library[t].checked = false;
      let i = 0;
      libraryArray.controls.forEach((item: FormControl) => {

        if (item.value === e.target.value) {
          libraryArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  remove(event) {
    for (let data of this.array1) {
      if (event.name === data.name) {
        if (data.checked == true) {
          data.checked = false;
        }
      }
    }

    let filterPayload: any = this.filterForm.value;
    filterPayload.durationLow = this.value;
    filterPayload.durationHigh = this.highValue;
    this.filterForm.value.levelArray = [
      ...new Set(this.filterForm.value.levelArray),
    ];
    let index = filterPayload.levelArray.indexOf(event.name);
    if (index > -1) {
      filterPayload.levelArray.splice(index, 1);
    }
    if (
      filterPayload.levelArray.length == 0 &&
      filterPayload.themeArray.length == 0 &&
      filterPayload.libraryArray.length == 0
    ) {
      this.clear();
      return;
    }
    this.filterForm.value.levelArray = [
      ...new Set(this.filterForm.value.levelArray),
    ];
    let removelibraryArrayData = this.filterForm.value.libraryArray.join();
    let removelevelArrayData = this.filterForm.value.levelArray.join();
    let removethemeArrayData = this.filterForm.value.themeArray.join();

    const filterData = {
      levels: removelevelArrayData ? removelevelArrayData : '',
      themes: removethemeArrayData ? removethemeArrayData : '',
      libraries: removelibraryArrayData ? removelibraryArrayData : '',
      sprint_duration: `${this.value}-${this.highValue}`,
      glf: this.filterForm.value.isGlf ? this.filterForm.value.isGlf : false,
      priority_name: this.priorityName
    }
    this.configService.setConfig({ isLoader: true });
    this.designService.getFilteredSprint(filterData).subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.sprints = res.reverse().map((o: Sprint) => {
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
    },
      (err) => {
        this.configService.setConfig({ isLoader: false });
      });
  }

  removeTheme(event) {

    for (let data of this.array2) {
      if (event.name === data.name) {
        if (data.checked == true) {
          data.checked = false;
        }
      }
    }

    let filterPayload: any = this.filterForm.value;
    filterPayload.durationLow = this.value;
    filterPayload.durationHigh = this.highValue;
    this.filterForm.value.themeArray = [
      ...new Set(this.filterForm.value.themeArray),
    ];
    let index = filterPayload.themeArray.indexOf(event.value);
    if (index > -1) {
      filterPayload.themeArray.splice(index, 1);
    }
    if (
      filterPayload.levelArray.length == 0 &&
      filterPayload.themeArray.length == 0 &&
      filterPayload.libraryArray.length == 0
    ) {
      this.clear();
      return;
    }
    this.filterForm.value.themeArray = [
      ...new Set(this.filterForm.value.themeArray),
    ];
    let removelibraryArrayData = this.filterForm.value.libraryArray.join();
    let removelevelArrayData = this.filterForm.value.levelArray.join();
    let removethemeArrayData = this.filterForm.value.themeArray.join();

    const filterData = {
      levels: removelevelArrayData ? removelevelArrayData : '',
      themes: removethemeArrayData ? removethemeArrayData : '',
      libraries: removelibraryArrayData ? removelibraryArrayData : '',
      sprint_duration: `${this.value}-${this.highValue}`,
      glf: this.filterForm.value.isGlf ? this.filterForm.value.isGlf : false,
      priority_name: this.priorityName
    }
    this.configService.setConfig({ isLoader: true });
    this.designService.getFilteredSprint(filterData).subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.sprints = res.reverse().map((o: Sprint) => {
        const returnObj: Sprint = {
          ...o,
          icon: o.theme1 ? o.theme1 : 'Empty',
          color: '#278ce9',
          iconclass: 'pg-txt-orange-strength',
          bgclass: 'pg-bg-orange-strength',
        };
        return returnObj;
      });
    },
      (err) => {
        this.configService.setConfig({ isLoader: false });
      });
  }

  removeLibrary(event) {
    for (let data of this.array3) {
      if (event.value === data.value) {
        if (data.checked == true) {
          data.checked = false;
        }
      }
    }

    let filterPayload: any = this.filterForm.value;
    filterPayload.durationLow = this.value;
    filterPayload.durationHigh = this.highValue;
    let index = filterPayload.libraryArray.indexOf(event.value);
    if (index > -1) {
      filterPayload.libraryArray.splice(index, 1);
    }
    if (
      filterPayload.levelArray.length == 0 &&
      filterPayload.themeArray.length == 0 &&
      filterPayload.libraryArray.length == 0
    ) {
      this.clear();
      return;
    }
    this.filterForm.value.libraryArray = [
      ...new Set(this.filterForm.value.libraryArray),
    ];
    let removelibraryArrayData = this.filterForm.value.libraryArray.join();
    let removelevelArrayData = this.filterForm.value.levelArray.join();
    let removethemeArrayData = this.filterForm.value.themeArray.join();

    const filterData = {
      levels: removelevelArrayData ? removelevelArrayData : '',
      themes: removethemeArrayData ? removethemeArrayData : '',
      libraries: removelibraryArrayData ? removelibraryArrayData : '',
      sprint_duration: `${this.value}-${this.highValue}`,
      glf: this.filterForm.value.isGlf ? this.filterForm.value.isGlf : false,
      priority_name: this.priorityName
    }
    this.configService.setConfig({ isLoader: true });
    this.designService.getFilteredSprint(filterData).subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.sprints = res.reverse().map((o: Sprint) => {
        const returnObj: Sprint = {
          ...o,
          icon: o.theme1 ? o.theme1 : 'Empty',
          color: '#278ce9',
          iconclass: 'pg-txt-orange-strength',
          bgclass: 'pg-bg-orange-strength',
        };
        return returnObj;
      });
    },
      (err) => {
        this.configService.setConfig({ isLoader: false })
      });
  }

  filterOpened(e) {
    this.selectedvalue = null;
    if (e) {
      document.getElementsByTagName('body')[0].style.position = 'fixed';
    } else {
      document.getElementsByTagName('body')[0].style.position = 'static';
    }
  }

  storeSprintFad() {
    this.teamId = localStorage.getItem('selectedTeamId');
    localStorage.setItem('sprint_Id', this.selectedActions);
    localStorage.setItem('sprint_name', this.sprintName);
    if (this.selectedActions) {
      const payload = {
        team_id: this.teamId,
        sprintName: this.sprintName,
        durationInWeeks: Number(this.schedule),
        description: this.sprintDescription
      };
      this.configService.setConfig({ isLoader: true });
      this.designService.addConfigureSprint(payload)
        .subscribe(
          (res: any) => {
            this.configService.setConfig({ isLoader: false });
            this.dataService.nextMessage({
              isEdit: false,
              isResetDesignEdit: true,
            });
            this.router.navigate(['/teams/design/configure']);
          },
          (err) => {
            this.configService.setConfig({ isLoader: false });
          }

        );
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
    
    console.log("low",this.value);
    console.log("high",this.highValue);
    this.filterForm.value.themeArray = [...new Set(this.filterForm.value.themeArray)]
    this.filterForm.value.levelArray = [...new Set(this.filterForm.value.levelArray)]
    this.filterForm.value.libraryArray = [...new Set(this.filterForm.value.libraryArray)]
    let libraryArrayData = this.filterForm.value.libraryArray.join();
    let levelArrayData = this.filterForm.value.levelArray.join();
    let themeArrayData = this.filterForm.value.themeArray.join();
    this.configService.setConfig({ isLoader: true });
    this.matSelect.close();
    const filterData = {
      levels: levelArrayData ? levelArrayData : '',
      themes: themeArrayData ? themeArrayData : '',
      libraries: libraryArrayData ? libraryArrayData : '',
      sprint_duration: `${this.value}-${this.highValue}`,
      glf: this.filterForm.value.isGlf ? this.filterForm.value.isGlf : false,
      priority_name: this.priorityName
    }
    this.designService.getFilteredSprint(filterData).subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.sprints = res.reverse().map((o: Sprint) => {
        const returnObj: Sprint = {
          ...o,
          icon: o.theme1 ? o.theme1 : 'Empty',
          color: '#278ce9',
          iconclass: 'pg-txt-orange-strength',
          bgclass: 'pg-bg-orange-strength',
        };
        return returnObj;
      });
    },
      (err) => {
        this.configService.setConfig({ isLoader: false });
      });
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
    for (let data of this.Library) {
      if (data.checked == true) {
        data.checked = false;
      }
    }
    const themeArray = (<FormArray>this.filterForm.get('themeArray')).clear();
    const levelArray = (<FormArray>this.filterForm.get('levelArray')).clear();
    const libraryArray = (<FormArray>this.filterForm.get('libraryArray')).clear();
    this.filterForm.get('isGlf').patchValue(false);
    this.getSprint();
  }
}