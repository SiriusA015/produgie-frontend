import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from 'src/app/event/event.service';
import 'moment-timezone';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  constructor(
    private matdialogRef: MatDialogRef<EventDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Event
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.matdialogRef.close();
  }
}
