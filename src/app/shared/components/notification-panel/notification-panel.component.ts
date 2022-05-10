import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from './../../service/notification.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { WcReviewDialogComponent } from 'src/app/sprint/components/modals/wc-review-dialog/wc-review-dialog.component';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.scss'],
})
export class NotificationPanelComponent implements OnInit {
  readNotification = [];
  unreadNotification = [];
  loadCounter = 0;
  isLoading = false;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<NotificationPanelComponent>
  ) { }

  ngOnInit(): void {
    this.getReadNotifications();
  }

  getReadNotifications() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/notification/read`)
      .subscribe((res: any) => {
        this.readNotification = res.data;

        this.loadCounter -= 1;
        this.getUnreadNotifications();
      });
  }

  getUnreadNotifications() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/notification/unread`)
      .subscribe((res: any) => {
        this.unreadNotification = res.data;
        this.loadCounter -= 1;
      });
  }
  markAsRead(id: any) {
    this.isLoading = true;
    this.http
      .patch(`${environment.baseurl}/notification/mark-read/${id}`, {})
      .subscribe((res: any) => {
        this.getReadNotifications();

        const selectedRead = _.find(
          this.unreadNotification,
          (a) => a.id === id
        );
        const index = _.indexOf(this.unreadNotification, selectedRead);
        this.unreadNotification.splice(index, 1);
        this.readNotification.push(selectedRead);
        this.notificationService.setNotification();
        this.isLoading = false;
      });
  }
  markAllAsRead() {
    this.isLoading = true;
    this.http.patch(`${environment.baseurl}/notification/mark-all-read`, {})
      .subscribe((res: any) => {
        this.getReadNotifications();
        
        this.unreadNotification.filter(o => o.notificationType !== 'wc').map((o) => {
          this.readNotification.push(o);
        });
        this.unreadNotification = this.unreadNotification.filter(o => o.notificationType === 'wc');
        this.notificationService.setNotification();
        this.isLoading = false;
      });
  }
  openwcNotificationDialog(wcNotification) {
    const dialogRef = this.dialog.open(WcReviewDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      panelClass: 'custom-dialog-container',
      data: wcNotification
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isCancel) {
        this.markAsRead(result.unreadId);
        window.location.reload();
      }
    });
  }
  onClose() {
    this.dialogRef.close();
  }
}
