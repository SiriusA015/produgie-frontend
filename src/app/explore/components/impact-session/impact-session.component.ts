import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';

@Component({
	selector: 'app-impact-session',
	templateUrl: './impact-session.component.html',
	styleUrls: ['./impact-session.component.scss'],
})
export class ImpactSessionComponent implements OnInit {
	loadCounter = 0;
	triggerData: any;
	isStyleDone: any;
	isStrategyDone: any;
	isStyleComplete: any;
	isStrategyComplete: any;
	reportGenerated: boolean;
	jobroleAdded: boolean;
	constructor(
		private snackBar: MatSnackBar,
		private http: HttpClient,
		public configService: ConfigService,
		private dataCheck: DataCheckService,
		private router: Router,
		private matDialog: MatDialog // private spinner: NgxSpinnerService
	) { }
	sessionEmpty = true;
	sessionList = [

		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/02/09'),
			time: '4.30pm to 5.30pm SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZUkdeyopzsjH92LXm-o5Ep53RNvB-Jkc1z7',
		},
		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/02/16'),
			time: '4.30pm to 5.30pm SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZAvdOivrDMrE9K56oHrKi6p7Bzql51x36Pe',
		},
		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/02/23'),
			time: '4.30pm to 5.30pm SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZEsdeGhqz0rG9Ca6XSVXsQC09IbEtPU_XxQ',
		},
		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/03/02'),
			time: '6am to 7am SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZEpde2hrzIuGt2BH6YQpRnUPg1-GuJnuIJe',
		},
		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/03/09'),
			time: '5pm to 6pm SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZUpc-GgqDkjH9HUEA9Uh5NzOQ2LGf3TkAAG',
		},
		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/03/16'),
			time: '9pm to 10pm SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZAoce-uqzgjG9IYm4QsUPwYLN5i2lucaEqL',
		},
		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/03/23'),
			time: '5pm to 6pm SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZcvdO6qqj4vHtLi4WGtVF6-1gTwIjy0P1vL',
		},
		{
			orgName: 'Open to all',
			isOpen: false,
			date: new Date('2022/03/30'),
			time: '5pm to 6pm SGT',
			registration:
				'https://us02web.zoom.us/meeting/register/tZMlduqtpzIoGNXwkkEjFYh1lI8LPPVNnOF6',
		},
	];

	ngOnInit(): void {
		this.getAssessmentTrigger();
	}

	getAssessmentTrigger() {
		this.loadCounter += 1;
		this.dataCheck.getAssessmentTrigger().subscribe(
			(res: any) => {
				if (!res.isAgree) {
					this.router.navigate(['/auth/policy-consent']);
				}
				this.triggerData = res.data;
				this.reportGenerated = this.triggerData.reportGenerated;
				this.configService.setConfig({ isLoader: false });

				this.loadCounter -= 1;
			},
			(err) => console.error(err)
		);
	}
}
