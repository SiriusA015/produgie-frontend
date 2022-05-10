import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../service/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sprint-warning-modal',
  templateUrl: './sprint-warning-modal.component.html',
  styleUrls: ['./sprint-warning-modal.component.scss'],
})
export class SprintWarningModalComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    public dialogRef: MatDialogRef<SprintWarningModalComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
  onConfirm(): void {
    this.dialogRef.close();
    this.router.navigate(['/design/sprint-final']);
    this.dataService.nextMessage({ isEdit: true });
  }
  Cancel() {
    this.dialogRef.close();
    this.router.navigate(['/design/fad-priority']);
    this.dataService.nextMessage({ isEdit: true });
  }
}
