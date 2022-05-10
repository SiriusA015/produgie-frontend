import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-teams-review-modal',
  templateUrl: './teams-review-modal.component.html',
  styleUrls: ['./teams-review-modal.component.scss']
})
export class TeamsReviewModalComponent implements OnInit {

  loadCounter = 0;
  date = new Date();
  isLoading: boolean;
  readNotification: any;
  score: any;
  question: any;
  teamId: string;
  userId: string;
  teamSprintId: string;
  constructor(
    private notificationService: NotificationService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TeamsReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  options = [
    { label: 'What weekly Check-in?', value: 1 },
    { label: 'Didn\'t do it-but thought about doing it', value: 2 },
    { label: 'Kind of did it - but was not very useful', value: 3 },
    { label: 'Did it and progressed my Sprint', value: 4 },
    {
      label: 'Was really helpful - progressed my Sprint and Insight',
      value: 5,
    },
  ];
  selectedOption;

  ngOnInit(): void {
    console.log(this.data);
  }

  onSelect(option) {
    console.log(option);
    this.score =option.value;
    this.question = option.label;
    this.selectedOption = option;
  }

  onSubmit() {
    let notificationDate =this.data.notificationDate.split("T");
    this.teamId = localStorage.getItem('selectedTeamId');
    this.userId = localStorage.getItem('user_id');
    this.teamSprintId = localStorage.getItem('selectedTeamId');
    if (this.selectedOption) {
      this.loadCounter += 1;
      const payload = {
        team_id:this.teamId,
        question:this.question,
        score:this.score,
        notification_date:notificationDate,
        sprint_id:this.teamSprintId
      };
   this.notificationService.submitWeeklyCheckin(payload).subscribe((res:any)=>{
     console.log(res);
     this.loadCounter -= 1;
     this.dialogRef.close({isCancel: false, unreadId: this.data.notificationId});     
   },error=>{
    this.loadCounter -= 1;
   })
    }
  }
  onClose() {
    this.dialogRef.close({isCancel: true});
  }

}
