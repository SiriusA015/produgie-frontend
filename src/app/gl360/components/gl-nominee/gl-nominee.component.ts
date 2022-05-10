import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import * as _ from 'lodash';
import { ArrayIsInclude } from './../../../shared/validators/array-is-include.validator';
export interface NomineeArray {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-gl-nominee',
  templateUrl: './gl-nominee.component.html',
  styleUrls: ['./gl-nominee.component.scss'],
})
export class GlNomineeComponent implements OnInit {
  message: any;
  allfft = false;
  allfeedback = false;
  userId = 1;
  clientId = 1;
  userSprintId;
  sprintId;
  assessmentId;
  userSprint;
  deleteIds = [];
  loadCounter = 0;
  crew = [
    {
      name: localStorage.getItem('userName'),
      role: 'Self',
      image: '/assets/icons/user-1.svg',
      email: localStorage.getItem('email'),
    },
  ];
  picture = 'avatar_10';
  crewForm: FormGroup;
  sprintcrew: FormArray;
  roleArray = {
    manager: 'Manager',
    mentor: 'Mentor',
    peer: 'Peer',
    team: 'Team',
    customer: 'Customer',
    coach: 'Coach',
    other: 'Other',
  };
  crews: any;
  nomineeCachingData: any;
  isValidFormLength: boolean = false;
  crewwarraydata: any;
  emailRegex = "[ ]*?[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}[ ]*?";

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getNominees();
    this.getcachindData();
    this.picture = localStorage.getItem('picture');
    this.crewForm = this.fb.group({
      crew: this.fb.array([this.createItemRow()]),
    });
    this.dataService.sharedMessage.subscribe(
      (message) => (this.message = message)
    );
    this.dataService.nextMessage({
      faddev: true,
      fadfocus: true,
      sprint: true,
      action: true,
      behaviour: true,
      outcome: true,
      step: 3,
    });
    this.dataService.nextMessage({ crew: true });
    this.crewForm.valueChanges.subscribe((val) => {

      if (this.crewForm.invalid) {
        this.dataService.nextMessage({ crew: false });
      } else {
        this.dataService.nextMessage({ crew: true });
      }
    });
    if (this.crewForm.valid) {
      this.dataService.nextMessage({ crew: true });
    } else {
      this.dataService.nextMessage({ crew: false });
    }
  }
  getSelectedCrew() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/sprintcrew/get-sel`).subscribe(
      (res2: any) => {
        this.crews = res2.data;
        res2.data.forEach((o, i) => {
          this.sprintcrew = this.crewForm.get('crew') as FormArray;
          this.sprintcrew.push(this.addCrewToForm(o));
          this.changeToFalse(i + 1);
        });
        if (res2.data.length > 0) {
          this.removeItemField(0);
        }
        this.configService.setConfig({ isLoader: false });
      },
      (err2) => {
        console.log(err2);
      }
    );
  }

  blockStartWhiteSpace(event) {
    const keyCode = event.which || event.keyCode
    if(keyCode == 32 && event.target.value == ''){
    return false;
    }
   
  }
  changeToFalse(index) {
    if (
      this.crewForm.get('crew')['controls'][index].getRawValue()
        .isFastForward &&
      !this.crewForm.get('crew')['controls'][index].getRawValue()
        .isFeedbackGoalsNBehaviour
    ) {
      this.crewForm
        .get('crew')
      ['controls'][index].controls.isFastForward.disable();
    } else if (
      !this.crewForm.get('crew')['controls'][index].getRawValue()
        .isFastForward &&
      this.crewForm.get('crew')['controls'][index].getRawValue()
        .isFeedbackGoalsNBehaviour
    ) {
      this.crewForm
        .get('crew')
      ['controls'][index].controls.isFeedbackGoalsNBehaviour.disable();
    } else {
      this.crewForm
        .get('crew')
      ['controls'][index].controls.isFastForward.enable();
      this.crewForm
        .get('crew')
      ['controls'][index].controls.isFeedbackGoalsNBehaviour.enable();
    }
  }
  createItemRow() {
    return this.fb.group({
      name: this.fb.control(null, Validators.required),
      email: this.fb.control(null, [
        Validators.required,
        Validators.pattern(this.emailRegex) ,
        ArrayIsInclude(this.crew.map((o) => o.email)),
      ]),
      role: this.fb.control('manager', Validators.required),
    });
  }
  getRole(nominee) {
    let role = '';
    if (nominee.isManager) {
      role = 'manager';
    } else if (nominee.isMentor) {
      role = 'mentor';
    } else if (nominee.isPeer) {
      role = 'peer';
    } else if (nominee.isTeam) {
      role = 'team';
    } else if (nominee.isCustomer) {
      role = 'customer';
    } else if (nominee.isCoach) {
      role = 'coach';
    } else {
      role = 'other';
    }
    return role;
  }
  addCrewToForm(crew) {
    let role = '';
    if (crew.isManager) {
      role = 'manager';
    } else if (crew.isMentor) {
      role = 'mentor';
    } else if (crew.isPeer) {
      role = 'peer';
    } else if (crew.isTeam) {
      role = 'team';
    } else if (crew.isCustomer) {
      role = 'customer';
    } else if (crew.isCoach) {
      role = 'coach';
    } else {
      role = 'other';
    }
    return this.fb.group({
      name: this.fb.control(crew.name, Validators.required),
      email: this.fb.control(crew.email, [
        Validators.required,
        CustomValidators.email,
      ]),
      role: this.fb.control(role, Validators.required),
    });
  }
  addItemField() {
    this.sprintcrew = this.crewForm.get('crew') as FormArray;
    this.sprintcrew.push(this.createItemRow());
    if (this.crewForm.valid) {
      this.dataService.nextMessage({ crew: true });
    } else {
      this.dataService.nextMessage({ crew: false });
    }
  }
  removeItemField(index: number) {
    this.sprintcrew = this.crewForm.get('crew') as FormArray;
    this.sprintcrew.removeAt(index);
    if (this.sprintcrew.length === 0) {
      this.sprintcrew.push(this.createItemRow());
    }
  }

  checkNomineeExist(nominee) {
    return this.crew.map((o) => o.email).indexOf(nominee.email) === -1;
  }


  saveNominee() {

    const payload: NomineeArray[] = this.crewForm.getRawValue().crew;
    const finalPayload: NomineeArray[] = [];
    payload.map((nominee) => {
      if (this.checkNomineeExist(nominee)) {
        finalPayload.push(nominee);
      }
    });

    this.loadCounter += 1;

    this.http
      .post(`${environment.baseurl}/nominee/nominee-add`, finalPayload)
      .subscribe(
        (res: any) => {
          if (res['success'] == true) {

            this.loadCounter -= 1;
            this.openSnackBar(res.data);
            this.crew = [this.crew[0]];
            this.sprintcrew = this.crewForm.get('crew') as FormArray;
            this.getNominees();
            this.sprintcrew.clear();
            this.crewForm.reset();
          }
          else {
            this.loadCounter -= 1;

            this.openSnackBar(res.data);
            this.crew = [this.crew[0]];
            this.sprintcrew = this.crewForm.get('crew') as FormArray;
            this.getNominees();
          }
        },

        (err) => {
          console.error(err);
          this.loadCounter -= 1;
        }
      );
  }
  openSnackBar(message) {
    this.snackbar.open(message, 'Ok', {
      duration: 1500,
    });
  }

  getNominees() {
    this.http.get(`${environment.baseurl}/nominee/get`).subscribe(
      (res: any) => {
        this.crewwarraydata = res.data;
        res.data.map((o) => {
          this.crew.push({
            name: o.name,
            email: o.email,
            role: this.getRole(o),
            image: '/assets/icons/user-1.svg',
          });
          this.sprintcrew = this.crewForm.get('crew') as FormArray;
          for (let index = 0; index < this.sprintcrew.length; index++) {
            this.sprintcrew
              .at(index)
              .get('email')
              .setValidators(ArrayIsInclude(this.crew.map((o) => o.email)));
          }
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }
  getcachindData() {
    this.http
      .get(`${environment.baseurl}/development/get-cache-data?type=nominee`)
      .subscribe(
        (res: any) => {
          this.nomineeCachingData = res.data;
        },
        (err) => console.log(err)
      );
  }
  onSelectionChange(event, i) {
    const myForm = (<FormArray>this.crewForm.get('crew')).at(i);
    myForm.patchValue({
      name: event.name,
      email: event.email,
      role: event.role,
    });
  }
  onEmailChange(event, i) {
    const myForm = (<FormArray>this.crewForm.get('crew')).at(i);
    myForm.patchValue({
      name: event.name,
      email: event.email,
    });

  }
}
