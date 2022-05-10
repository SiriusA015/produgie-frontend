import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WarningModalComponent } from 'src/app/design/components/design-final/modals/warning-modal/warning-modal.component';
import { DataService } from 'src/app/design/service/data.service';

@Component({
  selector: 'app-team-warning',
  templateUrl: './team-warning.component.html',
  styleUrls: ['./team-warning.component.scss']
})
export class TeamWarningComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
    public dialogRef: MatDialogRef<TeamWarningComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
  onConfirm(): void {
    this.dialogRef.close();
    this.router.navigate(['/teams/design/teams-fad']);
    this.dataService.nextMessage({ isEdit: true });
  }
  Cancel() {
    this.dialogRef.close();
  }

}
