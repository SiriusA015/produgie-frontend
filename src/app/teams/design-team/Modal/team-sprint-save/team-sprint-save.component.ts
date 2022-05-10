import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SaveModalComponent } from 'src/app/design/components/design-final/modals/save-modal/save-modal.component';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { DesignService } from '../../design.service';

@Component({
  selector: 'app-team-sprint-save',
  templateUrl: './team-sprint-save.component.html',
  styleUrls: ['./team-sprint-save.component.scss']
})
export class TeamSprintSaveComponent implements OnInit {

  sprintId: any

  constructor(
    private router: Router,
    private dataService: DataService,
    public dialogRef: MatDialogRef<SaveModalComponent>,
    private http: HttpClient,
    public configService: ConfigService,
    private designService: DesignService
  ) {}

  ngOnInit(): void {
    this.sprintId = localStorage.getItem('sprint_Id')
  }
  onConfirm(): void {
    this.configService.setConfig({ isLoader: true });
    this.dialogRef.close();
     this.designService.shareDesign(this.sprintId)
      .subscribe(
        (res1) => {
          this.router.navigate(['/teams/congratulation']);
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
