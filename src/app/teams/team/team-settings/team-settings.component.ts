import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/auth/Role';
import { ConfigService } from 'src/app/shared/service/config.service';
import { TeamService } from '../../team.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { ConfirmationPromptComponent } from '../confirmation-prompt/confirmation-prompt.component';

@Component({
  selector: 'app-team-settings',
  templateUrl: './team-settings.component.html',
  styleUrls: ['./team-settings.component.scss'],
})
export class TeamSettingComponent implements OnInit {
  createTeamForm: FormGroup;
  editTeamForm: FormGroup;
  teamMemberForm: FormGroup;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'email',
    'type',
    'role',
    'status',
    'GLA',
    'action',
  ];
  id: any;
  clientId: any;
  name: any;
  searchArray: Object;
  disable: boolean = false;
  isCreateTeamSubmited: boolean = false;
  isTableLoading: boolean = false;
  totalMembers: any;
  userId: any;
  roles: any;
  team_id: any;
  teamList: any;
  teamData: { name: any; description: any; created_by_user_id: any };
  isTeamSettingActive: boolean = false;
  isAddTeamSectionActive: boolean = false;
  teamInfo: any;
  isTeamEdit: boolean = false;
  isTeamCreated: boolean = false;
  isInfoSectionActive: boolean = false;
  isInviteSectionActive: boolean = false;
  isMemberSectionActive: boolean = false;
  selectedTeamMember: string;
  isViewingRightActive: boolean = false;
  prevUrl: string = '';
  isTeamData: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private configService: ConfigService,
    private _vps: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getName = debounce(
      this.getName,
      1000
    ); /* handling get name functionality using debouncing */
    this.getEmail = debounce(
      this.getEmail,
      1000
    ); /* handling get email functionality using debouncing */
  }

  ngOnInit(): void {
    this.createTeamForm = this.formBuilder.group({
      teamName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
    });

    this.editTeamForm = this.formBuilder.group({
      teamName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      teamDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500),
        ],
      ],
    });

    this.teamMemberForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.getTeamsList();
    this.id = JSON.parse(localStorage.getItem('user_id'));
    this.clientId = JSON.parse(localStorage.getItem('client_id'));

    this.route.queryParams.subscribe((queries) => {
      if (queries.prev) {
        this.prevUrl = queries.prev;
      }
    });
    /* set active tab */
    const isTeamCreated = localStorage.getItem('isTeamCreated');
    if (isTeamCreated == 'yes') {
      this.isTeamCreated = true;
      this.setActiveTab('settings');
    } else {
      this.isTeamCreated = false;
      this.setActiveTab('setup');
    }

    if (this.prevUrl == 'viewing-rights') {
      this.setActiveTab('createTeam');
    }
    if (this.prevUrl == 'add-new') {
      this.setActiveTab('createTeam');
    }
    if (this.prevUrl == 'team-settings') {
      this.setActiveTab('settings');
    }

    const team_id = localStorage.getItem('selectedTeamId');
    if (team_id != 'undefined') {
      this.team_id = JSON.parse(team_id);
      this.getTeamInfo();
      this.getTeamMember(this.team_id);
    }

    this.getRoles();
    this.triggerGetTeam();
  }

  setActiveTab(tab) {
    switch (tab) {
      case 'settings':
        this.isTeamSettingActive = true;
        this.isInfoSectionActive = true;

        this.isAddTeamSectionActive = false;
        this.isTeamEdit = false;
        this.isInviteSectionActive = false;

        this.isMemberSectionActive = true;

        break;
      case 'setup':
        this.isAddTeamSectionActive = true;

        this.isTeamSettingActive = false;
        this.isInfoSectionActive = false;
        this.isTeamEdit = false;
        this.isInviteSectionActive = false;

        this.isMemberSectionActive = false;
        break;
      case 'createTeam':
        this.isAddTeamSectionActive = true;

        this.isTeamSettingActive = false;
        this.isInfoSectionActive = false;
        this.isTeamEdit = false;
        this.isInviteSectionActive = false;

        this.isMemberSectionActive = false;
        break;
      case 'teamEdit':
        this.isTeamEdit = true;
        this.isInviteSectionActive = true;

        this.isAddTeamSectionActive = false;
        this.isTeamSettingActive = false;
        this.isInfoSectionActive = false;

        this.isMemberSectionActive = true;
        break;
      default:
        this.isTeamSettingActive = true;
        this.isInfoSectionActive = true;
        this.isAddTeamSectionActive = false;
        this.isTeamEdit = false;
        this.isInviteSectionActive = false;

        this.isMemberSectionActive = false;

        break;
    }
  }

  getTeamInfo() {
    const team_id = localStorage.getItem('selectedTeamId');
    this.isTeamData = true;
    this.teamService.getteamInfoById(team_id).subscribe(
      (res: any) => {
        this.isTeamData = false;
        this.teamInfo = res[0];
        this.patchTeamValues();
      },
      (err) => {
        this.isTeamData = false;
        console.log('team info API error', err);
      }
    );
  }

  gotoEdit(id) {
    this.setActiveTab('teamEdit');
    this.patchTeamValues();
  }

  patchTeamValues() {
    /* patch values of team info into add team form */
    if (this.teamInfo) {
      this.editTeamForm.setValue({
        teamName: this.teamInfo.name,
        teamDescription: this.teamInfo.description,
      });
    }
  }

  updateTeam() {
    /* make all fields as touched for showing validations message*/
    Object.keys(this.editTeamForm.controls).forEach((field) => {
      const control = this.editTeamForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    // stop here if form is invalid
    if (this.editTeamForm.invalid) {
      return;
    }

    let data = {
      name: this.editTeamForm.value.teamName,
      description: this.editTeamForm.value.teamDescription,
    };
    this.isCreateTeamSubmited = true;
    this.teamService.editTeam(data, this.teamInfo?.id).subscribe(
      (res: any) => {
        this.isCreateTeamSubmited = false;
        this.teamInfo = res;
        this.isTeamEdit = false;
        this.toastr.success('Success', 'Team Updated Successfully', {
          timeOut: 3000,
        });

        localStorage.setItem('selectedTeamId', res.id);
        let activeRole = localStorage.getItem('Role');

        if (activeRole == Role.TEAM_MEMBER) {
          localStorage.setItem('membertid', JSON.stringify(res.id));
        }

        this.team_id = res.id;
        this.setActiveTab('settings');
        this.getTeamsList();
      },
      (err) => {
        this.isCreateTeamSubmited = false;
        console.log('team edit API error', err);
        this.toastr.error('error', 'Something Went Wrong', {
          timeOut: 3000,
        });
      }
    );
  }

  triggerGetTeam() {
    this.configService.teamData.subscribe(
      (data: any) => {
        this.teamInfo = data.teamData;
        this.team_id = data.teamId;
        this.patchTeamValues();
        if (data.teamList?.length == 0) {
          this.dataSource.data = [];
        } else {
          this.dataSource.data = data.teamList;
        }
      },
      (error) => {}
    );
  }

  addTeam() {
    /* make all fields as touched for showing validations message*/
    Object.keys(this.createTeamForm.controls).forEach((field) => {
      const control = this.createTeamForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    // stop here if form is invalid
    if (this.createTeamForm.invalid) {
      return;
    }

    this.teamData = {
      name: this.createTeamForm.value.teamName,
      description: this.createTeamForm.value.description,
      created_by_user_id: JSON.parse(localStorage.getItem('user_id')),
    };

    this.isCreateTeamSubmited = true;
    this.teamService.createTeam(this.teamData).subscribe(
      (response: any) => {
        this.isCreateTeamSubmited = false;
        this.toastr.success('Success', 'Team Created Successfully', {
          timeOut: 3000,
        });
        this.createTeamForm.reset();
        this.teamInfo = response;
        localStorage.setItem('isTeamCreated', 'yes');
        localStorage.setItem('selectedTeamId', response.id);
        const activeRole = localStorage.getItem('Role');

        if (activeRole == Role.TEAM_MEMBER) {
          localStorage.setItem('membertid', JSON.stringify(response.id));
        }
        const isTeamCreated = localStorage.getItem('isTeamCreated');
        if (isTeamCreated == 'yes') {
          this.isTeamCreated = true;
        } else {
          this.isTeamCreated = false;
        }

        this.team_id = response.id;

        this.getTeamsList();
        this.getTeamMember(this.team_id);

        this.isAddTeamSectionActive = false;
        this.isInviteSectionActive = true;
        this.isMemberSectionActive = true;
        this.isInfoSectionActive = true;

        let data = this.teamData;
        const dialogRef = this.dialog.open(ConfirmationPromptComponent, {
          width: '500px',
          data: { data },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            /* scroll to invite section */
            this.scrollFn('member-section');
          } else {
            this.setActiveTab('settings');
          }
        });
      },
      (error) => {
        this.isCreateTeamSubmited = false;
        this.toastr.error('Something Went Wrong!');
        console.log(error);
      }
    );
  }

  getTeamMember(id) {
    this.isTableLoading = true;
    this.teamService.getTeam(id).subscribe(
      (res: any) => {
        this.isTableLoading = false;
        this.totalMembers = res.length;
        this.dataSource.data = res;
      },
      (err) => {
        this.isTableLoading = false;
        this.totalMembers = 0;
        this.dataSource.data = [];
        console.log('error', err);
      }
    );
  }
  getSearchMember(id, name) {
    this.teamService.searchTeamMember(id, name).subscribe(
      (res): any => {
        this.searchArray = res;
        if (res) {
          this.disable = true;
        }
      },
      (error) => {
        this.disable = false;
      }
    );
  }
  getRoles() {
    this.teamService.getAllRoles().subscribe((res: any) => {
      this.roles = res;
    });
  }
  getTeamsList() {
    const user_id = localStorage.getItem('user_id');
    this.teamService.getTeamManagerById(user_id).subscribe(
      (res: any) => {
        this.teamList = res;
        this.configService.setTeam({ teamList: this.teamList });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  inviteTeamMember() {
    /* make all fields as touched for showing validations message*/
    Object.keys(this.teamMemberForm.controls).forEach((field) => {
      const control = this.teamMemberForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });

    if (this.teamMemberForm.invalid) {
      return;
    }

    if (this.teamMemberForm.value.type == 'teamMember') {
      let data = {
        team_id: this.team_id,
        user_id: this.userId,
        role_id: this.teamMemberForm.value.role,
        added_by_user_id: this.id,
      };
      this.isCreateTeamSubmited = true;
      this.teamService.addUserInOrg(data).subscribe(
        (res: any) => {
          this.isCreateTeamSubmited = false;
          this.toastr.success('Success', 'User Invited Successfully', {
            timeOut: 3000,
          });
          this.teamMemberForm.reset();
          // this.setActiveTab("settings");
          this.getTeamsList();
          this.getTeamMember(this.team_id);
        },
        (error) => {
          this.isCreateTeamSubmited = false;
          this.toastr.error(
            error?.error?.errorMessage || 'Something weng wrong'
          );
        }
      );
    } else {
      let data = {
        team_id: this.team_id,
        name: this.teamMemberForm.value.name,
        email: this.teamMemberForm.value.email,
        role_id: this.teamMemberForm.value.role,
        added_by_user_id: this.id,
      };
      this.isCreateTeamSubmited = true;
      this.teamService.addUserAsGuest(data).subscribe(
        (res: any) => {
          this.isCreateTeamSubmited = false;
          this.toastr.success('Success', 'User Invited Successfully', {
            timeOut: 3000,
          });
          this.teamMemberForm.reset();
          // this.setActiveTab("settings");

          this.getTeamsList();
          this.getTeamMember(this.team_id);
        },
        (error) => {
          this.isCreateTeamSubmited = false;
          this.toastr.error(
            error?.error?.errorMessage || 'Something weng wrong'
          );
        }
      );
    }
  }

  getName(event) {
    this.name = event.target.value;

    if ((this.clientId, this.name.length < 3)) {
      return;
    }

    this.getSearchMember(this.clientId, this.name);
  }

  getEmail(event) {
    this.name = event.target.value;

    if ((this.clientId, this.name.length < 3)) {
      return;
    }

    this.getSearchMember(this.clientId, encodeURIComponent(this.name));
  }
  onChange(event) {
    if (event == 'teamMember') {
      this.selectedTeamMember = 'teamMember';
    } else {
      this.selectedTeamMember = 'guest';
    }
  }

  onSelectionChange(event) {
    this.selectedTeamMember = 'teamMember';
    this.teamMemberForm.patchValue({
      name: `${event.fullName}`,
      email: event.email,
      type: this.selectedTeamMember,
    });
    this.userId = event.id;

    // localStorage.setItem('team_member_user_id' , this.userId)
  }
  onEmailChange(event) {
    this.selectedTeamMember = 'teamMember';
    this.teamMemberForm.patchValue({
      name: `${event.fullName}`,
      email: event.email,
      type: this.selectedTeamMember,
    });
    this.userId = event.id;

    // localStorage.setItem('team_member_user_id' , this.userId)
  }

  removeTeamMember(data) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '500px',
      data: { data, type: 'team' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTeamMember(this.team_id);
      }
    });
  }

  scrollFn(anchor: string): void {
    this._vps.scrollToAnchor(anchor);
  }
  reInvite(element) {
    // let userId =localStorage.getItem('team_member_user_id')
    let data = {
      team_id: this.team_id,
      user_id: element.userId,
    };
    this.teamService.inviteUser(data).subscribe(
      (res: any) => {
        this.toastr.success('Success', 'User Reinvited Successfully', {
          timeOut: 3000,
        });
      },
      (error) => {
        this.toastr.error(error.error.errorMessage);
        console.log(error);
      }
    );
  }
  goToViewingRights() {
    this.isViewingRightActive = true;
    this.router.navigate(['/teams/viewing-rights']);
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.createTeamForm.controls;
  }
  get g() {
    return this.teamMemberForm.controls;
  }
  get e() {
    return this.editTeamForm.controls;
  }
}
