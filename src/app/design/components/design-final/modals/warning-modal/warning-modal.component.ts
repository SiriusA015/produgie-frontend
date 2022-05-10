import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../../service/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss'],
})
export class WarningModalComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    public dialogRef: MatDialogRef<WarningModalComponent>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}
  onConfirm(): void {
    this.dialogRef.close();
    this.router.navigate(['/design/fad']);
    this.dataService.nextMessage({ isEdit: true });
  }
  Cancel() {
    this.dialogRef.close();
  }
}
