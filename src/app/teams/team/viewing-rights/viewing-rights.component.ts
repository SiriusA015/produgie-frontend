import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from '../../team.service';

@Component({
  selector: 'app-viewing-rights',
  templateUrl: './viewing-rights.component.html',
  styleUrls: ['./viewing-rights.component.scss']
})
export class ViewingRightsComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'email', 'role', 'team-reports', 'sprint-design', 'team-dashboard'];
  formGroup: FormGroup;
  teamId: any;
  isLoading: boolean;
  teamMembersData = new MatTableDataSource();

  constructor(private teamService: TeamService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      team_id: [this.teamId],
      team_report: [false],
      sprint_design: [false],
      team_dashboard: [false],
    });
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.teamService.getAllViewingRightsUsers().subscribe((data: any) => {
      this.dataSource = data;
      this.isLoading = false;
    });

    this.teamService.getViewRightsTeamMember().subscribe((data: any) => {
      this.teamMembersData = data;
      this.isLoading = false;
    });
  }

  invite() {
    this.isLoading = true;
    this.teamService.saveInViewingRightUsers(this.formGroup.value).subscribe((data: any) => {
      this.isLoading = false;
      this.toastr.success('Success', data.responseMsg, {
        timeOut: 3000,
      });
      this.resetForm();
      this.getData();
    }, (error) => {
      this.isLoading = false;
      this.toastr.error('Error', error.error.errorMessage, {
        timeOut: 3000,
      });
    });
  }

  updateRoleBasedUsers(element, type, typeValue) {
    this.isLoading = true;
    element[type] = typeValue;
    this.teamService.updateInViewingRightUsers(element).subscribe((data: any) => {
      this.isLoading = false;
      this.toastr.success('Success', data.responseMsg, {
        timeOut: 3000,
      });
      this.getData();
    }, (error) => {
      this.isLoading = false;
      this.toastr.error('Error', error.error.errorMessage, {
        timeOut: 3000,
      });
    });
  }

  updateTeamMember(element, type, typeValue) {
    this.isLoading = true;
    element[type] = typeValue;
    this.teamService.updateViewRightsOfTeamMember(element).subscribe((data: any) => {
      this.isLoading = false;
      this.toastr.success('Success', data.responseMsg, {
        timeOut: 3000,
      });
      this.getData();
    }, (error) => {
      this.isLoading = false;
      this.toastr.error('Error', error.error.errorMessage, {
        timeOut: 3000,
      });
    });
  }

  resetForm() {
    this.formGroup.reset();
  }
}
