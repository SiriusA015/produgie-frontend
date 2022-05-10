import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { DEFAULT_ERROR_MSG } from 'src/app/constant';
import { environment } from 'src/environments/environment';
import { TeamsReviewModalComponent } from '../../../sprint/components/modals/teams-review-modal/teams-review-modal.component';
import { NotificationService } from '../../service/notification.service';

declare const $: any;
@Component({
  selector: 'app-teams-notification-panel',
  templateUrl: './teams-notification-panel.component.html',
  styleUrls: ['./teams-notification-panel.component.scss'],
})
export class TeamsNotificationPanelComponent implements OnInit {
  error: string;
  errorDescription: string;
  apiError: any;
  apiSuccess: any;
  showErrorMessage: boolean = false;
  loading: boolean = true;
  queryParams: any;
  readNotification = [];
  unreadNotification = [];
  loadCounter = 0;
  isLoading = false;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<TeamsNotificationPanelComponent>,
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReadNotifications();
    this.route.queryParams.subscribe((queries) => {
      this.queryParams = queries;
      this.loading = false;
      if (queries.error) {
        this.error = queries.error;
        this.errorDescription = queries.error_description;
      }
    });
  }

  getReadNotifications() {
    this.loadCounter += 1;
    this.notificationService
      .getTeamsReadNotifications()
      .subscribe((res: any) => {
        console.log(res, 'notify');
        this.readNotification = res;
        this.loadCounter -= 1;
        this.getUnreadNotifications();
      });
  }

  getUnreadNotifications() {
    this.loadCounter += 1;
    this.notificationService
      .getTeamsUnReadNotifications()
      .subscribe((res: any) => {
        this.unreadNotification = res;
        this.loadCounter -= 1;
      });
  }

  markAsRead(id: any) {
    this.isLoading = true;

    let data = {
      notificationId: id,
    };

    this.notificationService
      .getTeamsMarkReadNotifications(data)
      .subscribe((res: any) => {
        const selectedRead = _.find(
          this.unreadNotification,
          (a) => a.notificationId === id
        );
        const index = _.indexOf(this.unreadNotification, selectedRead);
        this.unreadNotification.splice(index, 1);
        this.readNotification.push(selectedRead);
        this.notificationService.teamsSetNotifications();
        this.isLoading = false;
      });
  }

  markAllAsRead() {
    this.isLoading = true;

    let teamId = localStorage.getItem('selectedTeamId');
    let userId = localStorage.getItem('user_id');
    let data = {
      userId: userId,
      teamId: teamId,
    };

    this.notificationService
      .getTeamsMarkAllReadNotifications(data)
      .subscribe((res: any) => {
        this.unreadNotification
          .filter((o) => o.notificationType !== 'frequency check-in')
          .map((o) => {
            this.readNotification.push(o);
          });
        this.unreadNotification = this.unreadNotification.filter(
          (o) => o.notificationType === 'frequency check-in'
        );
        this.notificationService.teamsSetNotifications();
        this.isLoading = false;
      });
  }

  openwcNotificationDialog(wcNotification) {
    const dialogRef = this.dialog.open(TeamsReviewModalComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container',
      data: wcNotification,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.markAsRead(result.unreadId);
        this.getReadNotifications();
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  joinTeam(e) {
    let actionValue = e.srcElement.value;
    let callbackURL = `${environment.teamBaseUrl}/guest/join-team?status=${actionValue}&id=${this.queryParams.orgMemberId}&token=${this.queryParams.token}&type=${this.queryParams.userType}`;

    this.loading = true;

    this.http.get(callbackURL).subscribe(
      (res: any) => {
        this.loading = false;
        this.apiSuccess = res.message;

        if (actionValue == 'accepted') {
          this.toastr.success('Success', res.message, {
            timeOut: 7000,
          });
        }
        if (actionValue == 'decline') {
          this.toastr.warning('Warning', res.message, {
            timeOut: 7000,
          });
        }
        this.router.navigate(['/auth/login']);
      },
      (err: any) => {
        this.loading = false;
        this.apiError = err.error.errorMessage || DEFAULT_ERROR_MSG;
        this.toastr.error(this.apiError, 'Error', {
          timeOut: 3000,
        });
        // this.router.navigate(['/auth/login']);
      }
    );
  }

  declineInvitation() {
    this.router.navigate(['/auth/login']);
  }
}
