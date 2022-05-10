import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounce } from 'lodash';
import * as moment from 'moment';
import 'moment-timezone';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEFAULT_ERROR_MSG } from 'src/app/constant';
import { ModalDialogComponent } from 'src/app/dashboard/components/user-dashboard/modal-dialog/modal-dialog.component';
import { EventCancelComponent } from 'src/app/event/event-cancel/event-cancel.component';
import { EventDetailComponent } from 'src/app/event/event-detail/event-detail.component';
import { Event, EventService, EventStatus, ScheduleStatus } from 'src/app/event/event.service';
import { ConfigService } from 'src/app/shared/service/config.service';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

	data: Event[];
	EventStatus = EventStatus;
	header: string[] = ['Session', 'Holder', 'Audience', 'Date', 'Time', 'Action'];
	isTableLoading: boolean = false;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	ScheduleStatus = ScheduleStatus;
	timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	totalCount: number;
	params = {
		page: 0,
		size: 5,
		sortName: 'date',
		sortOrder: 'asc',
		filterOption: 'session',
		keyword: ''
	};
	filterOption: string = 'session';

	private _unsubscribedAll: Subject<any> = new Subject<any>();

	constructor(
		private dialog: MatDialog,
		private eventService: EventService,
		public configService: ConfigService,
	) {
		this.doFilter = debounce(this.doFilter, 1000);/* handling search functionality using debouncing */
	}

	ngOnInit(): void {
		this.getData();
	}

	ngOnDestroy(): void {
		this._unsubscribedAll.next(null);
		this._unsubscribedAll.complete();
	}

	doFilter(): void {
		this.params.filterOption = this.filterOption;
		if (this.params.keyword) {
			this.getData(true);
		}
	}

	private getData(refresh: boolean = false): void {

		if (refresh) {
			this.params.page = 0;
		};

		this.isTableLoading = true;
		this.eventService.getEvents(this.params)
			.pipe(takeUntil(this._unsubscribedAll))
			.subscribe(
				data => {
					this.data = data.data;
					this.totalCount = data.totalElements;
				},
				err => {
					const dialogRef = this.dialog.open(ModalDialogComponent, {
						width: '360px',
						data: {
							message: DEFAULT_ERROR_MSG,
							hasCancelButton: false
						},
					});
				}
			)
			.add(() => {
				this.isTableLoading = false;
			})
	}

	filterData(event: any): void {
		this.params.keyword = event.value;
		this.getData(true);
	}

	registerEvent(item: Event): void {
		this.configService.setConfig({ isLoader: true });

		const timeZoneOffset: number = moment().utcOffset();
		this.eventService.registerEvent(item.id, timeZoneOffset)
			.pipe(takeUntil(this._unsubscribedAll))
			.subscribe(
				() => {
					this.getData();
					const dialogRef = this.dialog.open(ModalDialogComponent, {
						width: '360px',
						data: {
							message: 'Registered Successfully!',
							hasCancelButton: false
						}
					});
					dialogRef.afterClosed().subscribe(() => {
					})
				},
				err => {
					const dialogRef = this.dialog.open(ModalDialogComponent, {
						width: '360px',
						data: {
							message: 'Unable to register.\n' + DEFAULT_ERROR_MSG,
							hasCancelButton: false
						}
					});
				}
			)
			.add(() => {
				this.configService.setConfig({ isLoader: false });
			})
	}

	pagination(pageEvent: PageEvent): void {
		this.params.page = this.params.size === pageEvent.pageSize ? pageEvent.pageIndex : 0;
		this.params.size = pageEvent.pageSize;
		this.data = null;
		this.getData();
	}

	sorting(name: 'date' | 'action') {
		if (this.params.sortName === name) {
			this.params.sortOrder = this.params.sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			this.params.sortName = name;
			this.params.sortOrder = 'asc';
		}
		this.getData(true);
	}

	popupDetail(item: Event): void {

		this.dialog.open(EventDetailComponent, {
			width: '100vw',
			maxWidth: '80rem',
			height: '100%',
			maxHeight: '70rem',
			panelClass: 'event-dialog-container',
			data: item
		});
	}

	popupCancel(item: Event): void {
		const dialogRef = this.dialog.open(EventCancelComponent, {
			width: '100%',
			maxWidth: '80rem',
			height: '100%',
			maxHeight: '35rem',
			panelClass: 'event-dialog-container',
		});

		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.configService.setConfig({ isLoader: true });
			this.eventService.unregisterEvent(item.id, res.selectedReason)
				.pipe(takeUntil(this._unsubscribedAll))
				.subscribe(
					() => {
						this.getData();
						const dialogRef = this.dialog.open(ModalDialogComponent, {
							width: '360px',
							data: {
								message: 'Successfully cancelled!',
								hasCancelButton: false
							}
						});
					},
					err => {
						const dialogRef = this.dialog.open(ModalDialogComponent, {
							width: '360px',
							data: {
								message: 'Unable to cancel.\n' + DEFAULT_ERROR_MSG,
								hasCancelButton: false
							}
						});
					}
				)
				.add(() => {
					this.configService.setConfig({ isLoader: false });
				})
		})
	}

	openFilter(): void {
		// TODO: waiting  for the final version of #2685
	}

	routeTo(item: Event): void {
		window.open(item.location.joinUrl, '_blank');
	}
}
