import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-event-cancel',
	templateUrl: './event-cancel.component.html',
	styleUrls: ['./event-cancel.component.scss']
})
export class EventCancelComponent implements OnInit {

	selectedReason: string;
	reasons: string[] = [
		'I realised that I have another appointment/meeting lined up.',
		'Something just came up that requires my immediate attention.',
		'This meeting is no longer necessary for me.',
		'I prefer another meeting time.',
		'I registered for the wrong event.',
		'Others'
	]

	constructor(
		private matdialogRef: MatDialogRef<EventCancelComponent>,
	) { }

	ngOnInit(): void {
	}

	close(): void {
		this.matdialogRef.close({ selectedReason: this.selectedReason });
	}

	dismiss(): void {
		this.matdialogRef.close();
	}
}
