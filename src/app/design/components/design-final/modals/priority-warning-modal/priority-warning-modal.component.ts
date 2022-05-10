import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../../service/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-priority-warning-modal',
  templateUrl: './priority-warning-modal.component.html',
  styleUrls: ['./priority-warning-modal.component.scss'],
})
export class PriotityWarningModalComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    public dialogRef: MatDialogRef<PriotityWarningModalComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
  onConfirm(): void {
    this.dialogRef.close();
    this.router.navigate(['/design/fad-priority']);
    this.dataService.nextMessage({ isEdit: true });
  }
  Cancel() {
    this.dialogRef.close();
    this.router.navigate(['/design/fad']);
    this.dataService.nextMessage({ isEdit: true });
  }
}
