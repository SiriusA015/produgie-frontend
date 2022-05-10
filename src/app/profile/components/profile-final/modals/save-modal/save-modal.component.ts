import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/design/service/data.service';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/service/config.service';

@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss'],
})
export class SaveModalComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    public dialogRef: MatDialogRef<SaveModalComponent>,
    private http: HttpClient,
    public configService: ConfigService
  ) {}

  ngOnInit(): void {}
  onConfirm(): void {
    this.configService.setConfig({ isLoader: true });
    this.dialogRef.close();
    this.http
      .patch(`${environment.baseurl}/assessmenttrigger/design-complete`, {})
      .subscribe(
        (res1) => {
          this.router.navigate(['/dashboard/congratulation']);
          this.configService.setConfig({ isLoader: false });
        },
        (err) => {
          console.log(err);
          this.configService.setConfig({ isLoader: false });
        }
      );
  }
  Cancel() {
    this.dialogRef.close();
  }
}
