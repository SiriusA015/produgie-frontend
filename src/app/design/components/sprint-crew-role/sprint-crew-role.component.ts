import { ConfigService } from './../../../shared/service/config.service';
import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EditScrewComponent } from '../edit-screw/edit-screw.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesignService } from '../../service/design/design.service';
const baseUrl = environment.baseurl;

@Component({
  selector: 'app-sprint-crew-role',
  templateUrl: './sprint-crew-role.component.html',
  styleUrls: ['./sprint-crew-role.component.scss'],
})
export class SprintCrewRoleComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'advice',
    'feedback',
    'actions',
  ];
  // dataSource: MatTableDataSource<any>;
  dataSource: any=[];
  isEdit = false;
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
  crewdata = [];
  crew = {
    name: localStorage.getItem('userName'),
    role: 'Self',
    image: '/assets/icons/user-1.svg',
    email: localStorage.getItem('email'),
    isFastForward: true,
    isFeedbackGoalsNBehaviour: true,
  };
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
  array1: any = [];
  tableData: any = [];
  sprintCachingData: any;
  editData: { [k: string]: any };
  isEditState: boolean;

  emailRegex = "[ ]*?[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}[ ]*?";
  submitted : boolean =false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private designService: DesignService
  ) {
    if (this.router?.getCurrentNavigation()?.extras?.state != null) {
      this.editData = this.router.getCurrentNavigation().extras.state;
    }

    this.designService.getCurentUrlParam();
  }

  ngOnInit(): void {

    this.dataService.nextMessage({
      action: false,
      actionGray: true,
      behaviour: false,
      behaviourGray: true,
      crew: true,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      // isEdit: false,
      outcome: false,
      outcomeGray: true,
      sprint: true,
      sprintShow: false,
      routine: false,
      step: 3,
      crewEdit: false,
    });
    this.getcachindData();

    this.crewForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern(this.emailRegex)]],
      role: [''],
      isFastForward: [true],
      isFeedbackGoalsNBehaviour: [true],
    });
    this.dataService.sharedMessage.subscribe((message) => {
      this.message = message;
      this.isEditState = this.message.isEditState;
    });


    this.dataService.sharedMessage.subscribe((message: any) => {
      if (!message.sprintLoadedFromUrl) {
        this.getSelectedCrew();
      } else {
        this.configService.setConfig({ isLoader: true });
      }

      if (message.isUrlLoaded) {
        this.getSelectedCrew();
      }
    });
 }

  ngAfterViewInit(): void {
   }

  changeToFalse(e) {
    console.log(e.target.value);
  }

  blockStartWhiteSpace(event) {
    const keyCode = event.which || event.keyCode
    if(keyCode == 32 && event.target.value == ''){
    return false;
    }

  }

  getSelectedCrew() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${baseUrl}/sprintcrew/get-sel`).subscribe(
      (res2: any) => {
        this.dataSource = res2.data;
        this.tableData = res2.data;
        this.crewdata[0] = this.crew;
        this.configService.setConfig({ isLoader: false });
      },
      (err2) => {
        console.log(err2);
      }
    );
  }

  get f() { return this.crewForm.controls; }

  addItemField() {
    this.submitted = true;
    if (this.crewForm.value.role == '') {
      this._snackBar.open('Please add role to continue', '', {
        duration: 3000,
      });
      return;
    }
    console.log('this is addItemField', this.crewForm.valid, this.crewForm.value)
    // if (this.crewForm.valid) {
      if (this.crewForm.value.isFastForward == null) {
        this.crewForm.value.isFastForward = true;
      }
      if (this.crewForm.value.isFeedbackGoalsNBehaviour == null) {
        this.crewForm.value.isFeedbackGoalsNBehaviour = true;
      }
      this.configService.setConfig({ isLoader: true });
      const finalPayload = this.crewForm.value;
      this.http
        .post(`${baseUrl}/sprintcrew/add-sprintcrew`, finalPayload)
        .subscribe(
          (res1: any) => {
            if (res1.status === 200) {
              this.getSelectedCrew();
             this.crewForm.reset(
             this.ngOnInit()
              );
           }
          },
          (err) => {
            if (err.status === 400) {
              this._snackBar.open('Duplicate crew member not allowed', '', {
                duration: 3000,
              });
              this.configService.setConfig({ isLoader: false });
            }
          }
        );
    // }
}

  getcachindData() {
    this.http
      .get(`${baseUrl}/development/get-cache-data?type=sprintcrew`)
     .subscribe(
        (res: any) => {
          this.sprintCachingData = res.data;
        },
        (err) => console.log(err)
      );
  }
  onSelectionChange(event) {
    this.crewForm.patchValue({
      email: event.email,
      name: event.name,
    });
  }
  onEmailChange(event) {
    this.crewForm.patchValue({
      email: event.email,
      name: event.name,
    });
  }
  storeCrew() {
     if (this.editData?.example == true) {
      this.router.navigate(['/design/sprint-final']);
    }
    else {
      if(this.dataSource.length > 0)
      {this.router.navigate(['/design/sprint-frequency']);
    }
    else
      {this._snackBar.open('Please Add at least one Crew Member', '', {
        duration: 3000,
      });}
    }
   }

  saveCrew() {

    if(this.dataSource.length > 0)
      {this.router.navigate(['/design/sprint-final']);
    }
    else
      {this._snackBar.open('Please Add at least one Crew Member', '', {
        duration: 3000,
      });
    }
  }
  editCrew(element) {
    const dialogRef = this.dialog.open(EditScrewComponent, {
      width: '500px',
      data: { element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getSelectedCrew();
      }
    });
  }
  deleteCrew(element) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '500px',
      data: { element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.getSelectedCrew();
      }
    });
  }

  public back() {
    this.router.navigate(['/design/sprint']);
  }

  public onCopied() {
    this._snackBar.open('Template URL Copied!', '', {
      duration: 3000,
    });
  }

  public copyTemplateUrl() {
    return `${location.origin}${this.router.url}`;
  }
}
