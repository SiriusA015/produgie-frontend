import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProfileService } from 'src/app/profile/service/profile.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DataCheckService } from 'src/app/shared/service/dataCheck.service';
import { DesignService } from 'src/app/teams/design-team/design.service';
import { TeamMemberServiceService } from 'src/app/teams/team-member/team-member-service.service';
import { TeamService } from 'src/app/teams/team.service';
import { Role } from '../../../auth/Role';
import { ConfirmDialogComponent } from '../../../design/components/Notification-Dialog/confirm-dialog/confirm-dialog.component';
import { TeamsNotificationPanelComponent } from '../../../shared/components/teams-notification-panel/teams-notification-panel.component';
import { SprintOnMobileDialogComponent } from '../modals/sprint-on-mobile-dialog/sprint-on-mobile-dialog.component';
import { environment } from './../../../../environments/environment';
import { NotificationPanelComponent } from './../../../shared/components/notification-panel/notification-panel.component';
import { NotificationService } from './../../../shared/service/notification.service';

declare const $: any;

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
	isOpen = false;
	isSprintSelected = false;
	isSprintOpen = false;
	statuscheck: any;
	isSidebarShow: boolean = false;
	isLoader = false;
	picture = 'avatar_10';
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe([Breakpoints.Handset, Breakpoints.Small])
		.pipe(
			map((result) => result.matches),
			shareReplay()
		);
	userName: any;
	notificationCount = 0;
	isSelectedSubmenu = 0;
	selectedMenu: any = '';
	subMenuData: any = [];
	exploreSubmenu: any = [
		{ title: 'My Portal', path: '/explore/aboutme' },
		{ title: 'My Growth Leader Profile', path: '/explore/aboutgrowthleaders' },
		// { title: 'Schedule Insights into Impact', path: '/explore/impactsession' },
	];
	teamExploreMenu: any = [
		'/teams/explore/team-explore',
		'/teams/explore/team-portal',
		'/teams/explore/growth-leader-teams-profile',
		'/team/explore/growth-leader-teams-profile',
		'/team/explore/teams-alignment-profile',
	];
	teamsDesignMenu: any = [
		'/teams/design/welcome',
		'/teams/design/teams-fad',
		'/teams/design/teams-fad-priority',
		'/teams/design/teams-sprint-configure',
		'/teams/design/configure',
		'/teams/design/teams-sprint-crew',
		'/teams/design/teams-sprint-frquency',
		'/teams/design/dev-plan',
		'/teams/teamMember-devplan'
	]
	// this.activatedRoute.snapshot['_routerState'].url
	settingSubmenu: any = ['My Profile', 'Viewing Rights', ' Active Consent'];
	isExploreSelected: boolean = false;
	type: boolean = false;
	imageData: string;
	isImageshow: any = 'none';
	data: string;
	profilepic: string;
	imageurl: string;
	profile: any;
	imageExist: boolean;
	preferedName: any;
	isPreferedNameShow: boolean = false;
	Avatar: any;
	common: any;
	isTeamsActive: boolean = false;
	teamList: any = [];
	selectedTeam: number;
	team_id: any;
	teamInfo: any;
	dataSource: any;
	gla_survey_completed: boolean = false;
	glaReportData: any;
	prevUrl: any;
	status: any;
	teamDetails: any;
	showTeamMemberMenu: boolean = false;
	viewDashboard: any;
	viewSprintDesign: any;
	rolesArray: any;
	selectedRole: any;
	rolesArr: [];
	isTeamId: boolean = false;
	isReportAllowed: boolean = false;
	teamNotificationCount = 0;
	isRoleChanged: boolean = false;
	teamActiveTabUrl: string;
	isTeamDesignTabActive: boolean = false;

	constructor(
		private breakpointObserver: BreakpointObserver,
		private http: HttpClient,
		private router: Router,
		private configService: ConfigService,
		private snackBar: MatSnackBar,
		private dialog: MatDialog,
		private notification: NotificationService,
		private datacheckservice: DataCheckService,
		private profileService: ProfileService,
		private teamService: TeamService,
		private authService: AuthService,
		private designService: DesignService,
		private toastr: ToastrService,
		private teamMemberService: TeamMemberServiceService,
		private activatedRoute: ActivatedRoute
	) {
		this.setActiveModule();
		this.setActiveTab();
	}

	async ngOnInit() {
		this.triggerProfileUpdate();
		this.triggerpreferedname();
		this.triggerGetTeam();

		const activeModule = localStorage.getItem('activeModule')
		const activeRole = localStorage.getItem('Role');

		if (activeModule == 'TEAM') {
			if (activeRole == Role.TEAM_MANAGER) {
				await this.getTeamsForManager();
				this.showTeamMemberMenu = false;
			}
			else {
				await this.getTeamMemberDetail();
				this.getViewDetailData();
				this.showTeamMemberMenu = true;
			}
			setTimeout(() => {
				this.notification.teamsSetNotifications();
			}, 2000);
			this.notification.teamsSharedNot.subscribe((data: any) => {
				this.teamNotificationCount = data;
			});
		}

		this.notification.setNotification();
		this.notification.sharedNot.subscribe((data: any) => {
			this.notificationCount = data;
		});

		if (localStorage.getItem('preferedName') == "undefined" || localStorage.getItem('preferedName') == null) {
			this.common = localStorage.getItem('userName');
		} else {
			this.common = localStorage.getItem('preferedName');
		}

		if (localStorage.getItem('gla_survey_completed') == "true") {
			this.gla_survey_completed = JSON.parse(localStorage.getItem('gla_survey_completed'));
		}

		this.rebuildRolesArr();

		this.isDesignCompleted();
	}

	rebuildRolesArr() {
		if (this.isTeamsActive) {
			const accessToken = this.authService.getAccessToken();
			const decoded: any = jwt_decode(accessToken);
			let rolesArr = decoded.Groups;

			this.rolesArr = rolesArr.filter(role => role === Role.TEAM_MANAGER || role === Role.TEAM_MEMBER)
				.map(role => {
					let roleObj = {
						name: role,
						value: role
					};
					if (role === Role.TEAM_MANAGER) roleObj.name = 'Manager';

					if (role === Role.TEAM_MEMBER) roleObj.name = 'Team Member';

					return roleObj;
				});
			const selectedRole = localStorage.getItem("Role");
			if (selectedRole === Role.TEAM_MEMBER) this.selectedRole = Role.TEAM_MEMBER;
			if (selectedRole === Role.TEAM_MANAGER) this.selectedRole = Role.TEAM_MANAGER;
		}
	}

	triggerGetTeam() {
		this.configService.teamCreate.subscribe((data: any) => {
			this.teamList = data.teamList;
			this.selectedTeam = JSON.parse(localStorage.getItem('selectedTeamId'));
		});
	}

	setActiveModule() {
		this.setTeamsActiveTab();
		let activeModule = localStorage.getItem('activeModule');
		if (activeModule == 'TEAM') {
			this.isTeamsActive = true;
		}
		else {
			this.isTeamsActive = false;
		}
	}
	ngAfterViewInit() {
		const el = document.getElementById("overlay");
		const _this = this;
		el.addEventListener("click", () => {
			document.getElementById('overlay').style.display = 'none';
			_this.isSidebarShow = false;
		});
	}

	setActiveTab() {
		this.selectedMenu = this.router.url;
		if (this.router.url == '/explore/aboutgrowthleaders') {
			this.setTeamsActiveTab();
			this.router.navigate(['/explore/aboutgrowthleaders'], {
				state: { example: this.type },
			});
		}
		if (
			this.router.url == '/explore/aboutme' ||
			this.router.url == '/explore/aboutgrowthleaders' ||
			this.router.url == '/explore/impactsession' ||
			this.router.url == 'explore/mysnapshot'
		) {
			this.subMenuData = this.exploreSubmenu;
			this.isExploreSelected = true;
		}
		if (this.router.url == '/profile/general-settings') {
			this.subMenuData = this.settingSubmenu;
			this.isExploreSelected = true;
		}

		this.isSprintSelected = this.selectedMenu.includes('sprint');
	}


	triggerProfileUpdate() {
		this.profileService.sharedimageUrl.subscribe((data: any) => {
			if (localStorage.getItem('imageurl') == 'undefined') {
				this.profilepic = `/assets/avatars/${localStorage.getItem(
					'picture'
				)}.svg`;
			} else {
				this.profilepic =
					environment.baseurl + localStorage.getItem('imageurl');

				this.http.get(this.profilepic).subscribe(
					(res: any) => { },
					(err) => {
						if (err.status == 400) {
							this.profilepic = `/assets/avatars/${localStorage.getItem(
								'picture'
							)}.svg`;
						}
					}
				);
			}
		});
	}

	triggerpreferedname() {
		this.profileService.sharedprefferedName.subscribe((data: any) => {
			this.common = data.preferedName;
			if (
				this.common === null ||
				this.common === "undefined") {
				this.common = localStorage.getItem('userName');
			} else {
				this.common = data.preferedName;
			}

		});
	}
	gotoHome() {
		const activeRole = localStorage.getItem('Role')
		let activeModule = localStorage.getItem('activeModule');
		if (activeModule == 'TEAM' && activeRole == Role.TEAM_MANAGER) {
			this.setTeamsActiveTab();
			this.router.navigate(['/teams/dashboard']);
		}
		else if (activeModule == 'TEAM' && activeRole == Role.TEAM_MEMBER) {
			if (this.viewDashboard) {
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/dashboard']);
			}
			else {
				this.toastr.info('Info', "You don't have an access of Dashboard", {
					timeOut: 3000,
				});
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/member/team-details']);
			}
		}
		else {
			this.isTeamsActive = false;
			localStorage.setItem('activeModule', 'LEAD')
			this.setTeamsActiveTab();
			this.router.navigate(['/dashboard/my-dashboard']);
		}
	}

	getMyProfile() {
		this.http.get(`${environment.baseurl}/user/me`).subscribe(
			(res: any) => {
				const username = res.fullName;
				localStorage.setItem('userName', username);
				localStorage.setItem('email', res.email);
				localStorage.setItem('preferedName', res.salutation);
				this.userName = localStorage.getItem('userName');
				this.configService.setConfig({ updateProfile: false });
			},
			(err) => console.log(err)
		);
	}
	changeIsOpen(): void {
		this.isOpen = !this.isOpen;
	}
	onDesignClick() {
		const activeRole = localStorage.getItem('Role')
		if (activeRole == Role.TEAM_MEMBER) {
			this.showTeamMemberMenu = true;
			if (this.viewSprintDesign) {
				this.setTeamsActiveTab();
				this.router.navigate(['teams/teamMember-devplan']);
			}
			else {
				this.toastr.info('info', "You don't have an access to Design", {
					timeOut: 3000,
				});
			}
		}
		else {
			this.getStatus();
		}
	}
	async changeRoleType(event) {
		localStorage.setItem('Role', event);
		this.isRoleChanged = true;
		const rolesArr = this.getRoles();
		if (this.teamList == undefined) {
			if (!rolesArr.includes(Role.TEAM_MANAGER) &&
				rolesArr.includes(Role.TEAM_MEMBER)) {
				const teamArr: any = await this.getTeamMemberDetail();
				if (teamArr?.length == 0) {
					this.toastr.info('info', "You don't have any team", {
						timeOut: 3000,
					});
				}
				this.showTeamMemberMenu = true;
				this.selectedTeam = this.teamList[0]?.id;
			}
			else {
				const teamArr: any = await this.getTeamsForManager();
				if (teamArr?.length == 0) {
					this.setTeamsActiveTab();
					this.router.navigate(['/teams/teams-setup']);
				}
				this.showTeamMemberMenu = false;
				this.selectedTeam = this.teamList[0]?.id;
			}
		}
		this.getTeamInfo();
		if (event == Role.TEAM_MEMBER) {

			this.selectedRole = Role.TEAM_MEMBER;
			this.showTeamMemberMenu = true;
			this.isTeamId = true;
			await this.getTeamMemberDetail();
			this.selectedTeam = this.teamList[0]?.id;

			/* Redirect to team details page if team memeber don't have any team joined */
			if (this.teamList.length <= 0) {
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/member/team-details']);
			}

			if (this.viewDashboard) {
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/dashboard']);
			}
			else {
				// this.toastr.info('Info', "You don't have an access of Dashboard", {
				//   timeOut: 3000,
				// });
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/member/team-details']);
			}
			setTimeout(() => {
				this.notification.teamsSetNotifications();
			}, 2000);
			this.notification.teamsSharedNot.subscribe((data: any) => {
				this.teamNotificationCount = data;
			});
		}
		else {
			this.selectedRole = Role.TEAM_MANAGER;
			this.showTeamMemberMenu = false;
			await this.getTeamsForManager();

			if (this.teamList?.length == 0 || this.teamList == undefined) {
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/teams-setup']);
			}
			else {
				this.selectedTeam = this.teamList[0]?.id;
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/dashboard']);
			}
			setTimeout(() => {
				this.notification.teamsSetNotifications();
			}, 2000);
			this.notification.teamsSharedNot.subscribe((data: any) => {
				this.teamNotificationCount = data;
			});
		}
	}

	async getViewDetailData() {
		try {
			const res: any = await this.teamMemberService.getViewingRightsDetails().toPromise();

			this.viewDashboard = res.team_dashboard;
			this.viewSprintDesign = res.sprint_design;
			this.isReportAllowed = res.team_report;
			return res;
		} catch (e) {
		}
	}

	getAssessment() {
		this.configService.setConfig({ isLoader: true });
		this.designService.getTeamAlignmentStatus().subscribe(
			(res: any) => {
				this.configService.setConfig({ isLoader: false });
				if (this.status && res.is_report_generate) {
					this.setTeamsActiveTab();
					this.router.navigate(['teams/design/welcome']);
				}
				else {
					this.toastr.warning('warning', "GLA/Team Alignment Report is mandatory to proceed to Design", {
						timeOut: 3000,
					});
					this.setTeamsActiveTab();
					this.router.navigate(['teams/explore/team-portal']);
				}
			},
			err => {
				this.configService.setConfig({ isLoader: false });
				console.log(err);
			}
		);
	}

	getStatus() {
		this.designService.getGlaReportStatus().subscribe((res: any) => {
			this.status = res.status;
			this.getAssessment();
		}, error => {
			console.log(error);
		})
	}

	isDesignCompleted() {
		this.datacheckservice.getAssessmentTrigger().subscribe((res: any) => {
			this.statuscheck = res.data['isDesignComplete'];
		});
	}

	designstatus() {
		if (this.statuscheck == false) {
			this.notifications();
		} else {
			this.changeSprintIsOpen();
		}
	}
	designTeamstatus() {
		this.datacheckservice.getStarted().subscribe((res: any) => {
			this.statuscheck = res._design_complete;
			if (this.statuscheck == false) {
				this.notifications();
			} else {
				this.changeSprintIsOpen();
			}
		});
	}

	notifications() {
		const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			width: '400px',
		});
		dialogRef.afterClosed().subscribe((result) => { });
	}

	changeSprintIsOpen(): void {
		this.dialog.open(SprintOnMobileDialogComponent, {
			width: '100vw',
		});
	}
	changeSprintIsOpeMobile(): void {
		this.isSprintOpen = !this.isSprintOpen;
	}
	openSnackBar(message) {
		this.snackBar.open(message, 'Ok', {
			duration: 2500,
		});
	}
	async signOut() {
		await this.authService.signOut();
	}

	openNotification() {
		this.notification.setNotification();
		const dialogRef = this.dialog.open(NotificationPanelComponent, {
			width: '40vw',
			maxWidth: '40vw',
			height: 'calc(100vh - 76px)',
			position: { right: '0', top: '76px' },
		});

		dialogRef.afterClosed().subscribe((result) => { });
	}
	openTeamNotification() {
		this.notification.teamsSetNotifications();
		let modelConfig;
		this.isHandset$.subscribe(isHandset => {
			if (isHandset) {
				modelConfig = {
					width: '100vw',
					maxWidth: '100vw',
					height: 'calc(100vh - 76px)',
					position: { right: '0', top: '76px' },
				}
			} else {
				modelConfig = {
					width: '40vw',
					maxWidth: '40vw',
					height: 'calc(100vh - 76px)',
					position: { right: '0', top: '76px' }
				}
			}
		});

		const dialogRef = this.dialog.open(TeamsNotificationPanelComponent, modelConfig
		);

		dialogRef.afterClosed().subscribe((result) => { });
	}
	openNotificationMobile() {
		this.notification.setNotification();
		const dialogRef = this.dialog.open(NotificationPanelComponent, {
			width: '100vw',
			maxWidth: '100vw',
			height: 'calc(100vh - 76px)',
			position: { right: '0', top: '76px' },
		});

		dialogRef.afterClosed().subscribe((result) => { });
	}

	tabClick(path: any) {
		this.router.navigate([path]);
	}

	async redirectToExplore(url: string) {
		let activeRole = localStorage.getItem('Role');
		const rolesArr = this.getRoles();
		if (!rolesArr.includes(Role.TEAM_MANAGER) &&
			rolesArr.includes(Role.TEAM_MEMBER)) {
			if (!this.isReportAllowed) {
				this.toastr.info('Info', "You don't have access of Explore section", {
					timeOut: 3000,
				});
			}
			else {
				this.setTeamsActiveTab();
				this.router.navigate(['teams/explore/growth-leader-teams-profile'])
			}
		}
		else if (rolesArr.includes(Role.TEAM_MANAGER) &&
			rolesArr.includes(Role.TEAM_MEMBER) &&
			activeRole === Role.TEAM_MEMBER &&
			!this.isReportAllowed) {
			this.toastr.info('Info', "As a team member you don't have access of Explore section", {
				timeOut: 3000,
			});
		}
		else if (rolesArr.includes(Role.TEAM_MANAGER) &&
			rolesArr.includes(Role.TEAM_MEMBER) &&
			activeRole === Role.TEAM_MEMBER &&
			this.isReportAllowed) {
			this.setTeamsActiveTab();
			this.router.navigate(['teams/explore/growth-leader-teams-profile'])
		}
		else {
			this.setTeamsActiveTab();
			this.router.navigate([url]);
		}
	}

	menuSelected(index: any, path: any) {
		this.isSelectedSubmenu = index;
		console.log(index);
		this.router.navigate([path], {
			state: { example: this.type },
		});
	}

	async toggleSidebar() {

		const accessToken = await this.authService.getAccessToken();

		const decoded: any = jwt_decode(accessToken);

		const roles = JSON.stringify(decoded.Groups);

		if (roles.includes(Role.TEAM_MANAGER) || roles.includes(Role.TEAM_MEMBER)) {
			this.isSidebarShow = !this.isSidebarShow;
		}

		if (this.isSidebarShow) {

			document.getElementById('overlay').style.display = 'block';
		} else {
			document.getElementById('overlay').style.display = 'none';
		}
	}

	async getTeamMemberDetail() {
		try {
			const res: any = await this.teamMemberService.getTeamDetails().toPromise();

			const teamListArr = res.map(data => {
				return { ...data.team }
			})
			this.teamList = teamListArr;
			if (this.teamList.length > 0) {

				const selectedTeamId = +localStorage.getItem("selectedTeamId");
				if (selectedTeamId && !this.isRoleChanged) {
					this.selectedTeam = selectedTeamId;
					this.isRoleChanged = false;
					localStorage.setItem('membertid', JSON.stringify(this.selectedTeam));
					localStorage.setItem('isTeamCreated', 'yes');
				} else {
					// if (this.selectedTeam == undefined || this.selectedTeam == null || this.isTeamId) {
					this.selectedTeam = this.teamList[0]?.id;
					// }
					localStorage.setItem('selectedTeamId', JSON.stringify(this.selectedTeam));
					localStorage.setItem('membertid', JSON.stringify(this.selectedTeam));
					localStorage.setItem('isTeamCreated', 'yes');
				}

				this.team_id = this.selectedTeam;
				await this.getViewDetailData();
				this.getTeamInfo();
			}
			else {
				localStorage.setItem('isTeamCreated', 'no');
			}
		} catch (e) { }
	}

	async checkTermsConditionAccepted() {
		try {
			return await this.datacheckservice.getAssessmentTrigger().toPromise();
		} catch (error) {

		}
	}

	async goToTeams() {
		this.configService.setConfig({ isLoader: true });
		/*  check is terms conditions accepted */
		const termsCondition: any = await this.checkTermsConditionAccepted();
		if (!termsCondition.isAgree) {
			this.router.navigate(['/auth/policy-consent']);
			return false;
		}

		const rolesArr = this.getRoles();
		localStorage.setItem('activeModule', 'TEAM');
		this.setActiveModule();
		this.isTeamsActive = true;
		let activeRole = localStorage.getItem('Role');

		if (this.teamList == undefined) {
			if (!rolesArr.includes(Role.TEAM_MANAGER) &&
				rolesArr.includes(Role.TEAM_MEMBER)) {
				await this.getTeamMemberDetail();
				this.showTeamMemberMenu = true;
			}
			else {
				await this.getTeamsForManager();
				this.showTeamMemberMenu = false;
			}

		}
		this.gla_survey_completed = JSON.parse(localStorage.getItem('gla_survey_completed'));
		if (
			!rolesArr.includes(Role.TEAM_MANAGER) &&
			rolesArr.includes(Role.TEAM_MEMBER)) {
			localStorage.setItem('Role', Role.TEAM_MEMBER)
			if (this.viewDashboard) {
				this.configService.setConfig({ isLoader: false });
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/dashboard']);
				return false;
			}
			else {
				this.configService.setConfig({ isLoader: false });
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/member/team-details']);
				return false;
			}
		}
		else if (this.teamList && this.teamList?.length == 0 && activeRole == Role.TEAM_MEMBER) {
			if (this.viewDashboard) {
				this.configService.setConfig({ isLoader: false });
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/dashboard']);
				return false;
			}
			else {
				this.configService.setConfig({ isLoader: false });
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/member/team-details']);
				return false;
			}
		}
		else if (!this.gla_survey_completed) {
			localStorage.setItem('Role', Role.TEAM_MANAGER)
			this.configService.setConfig({ isLoader: false });
			this.setTeamsActiveTab();
			this.router.navigate(['/teams/incomplete-gla']);
		}
		else if (this.teamList && this.teamList?.length == 0) {
			localStorage.setItem('Role', Role.TEAM_MANAGER)
			this.configService.setConfig({ isLoader: false });
			this.setTeamsActiveTab();
			this.router.navigate(['/teams/teams-setup']);
		}
		else if (this.teamList && this.teamList?.length > 0) {
			localStorage.setItem('Role', Role.TEAM_MANAGER)
			this.configService.setConfig({ isLoader: false });
			this.setTeamsActiveTab();
			this.router.navigate(['/teams/dashboard']);
		}
		else {
			localStorage.setItem('Role', Role.TEAM_MANAGER)
			this.configService.setConfig({ isLoader: false });
			this.setTeamsActiveTab();
			this.router.navigate(['/teams/dashboard']);
		}
		return false;
	}

	goToLeads() {
		localStorage.setItem('activeModule', 'LEAD')
		this.setTeamsActiveTab();
		this.router.navigate(['/dashboard/my-dashboard']);
	}

	async getTeamsForManager() {
		const user_id = localStorage.getItem('user_id');
		const role = localStorage.getItem('Role');
		try {
			const res: any = await this.http.get(`${environment.teamBaseUrl}/teams/getAllTeamsByManagerId/${user_id}`).toPromise();
			this.teamList = res;
			if (this.teamList.length > 0) {

				const selectedTeamId = +localStorage.getItem('selectedTeamId');

				if (selectedTeamId && !this.isRoleChanged) {
					this.selectedTeam = selectedTeamId;
					this.team_id = this.selectedTeam;
					this.isRoleChanged = false;
				} else {
					if (this.selectedTeam == undefined || this.selectedTeam == null) {
						this.selectedTeam = this.teamList[0].id;
					}
					if (role == Role.TEAM_MANAGER) {
						this.selectedTeam = this.teamList[0].id;
					}

					this.team_id = this.selectedTeam;
					localStorage.setItem('selectedTeamId', JSON.stringify(this.selectedTeam));
					localStorage.setItem('isTeamCreated', 'yes');
				}
				this.getTeamInfo();
			}
			else {
				localStorage.setItem('isTeamCreated', 'no');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async selectTeam(event) {
		this.isTeamId = false;
		this.configService.setTeamId({ selectedTeamId: +event }); //set updated team id to subject object

		localStorage.setItem('selectedTeamId', JSON.stringify(event));

		this.selectedTeam = JSON.parse(event)
		this.team_id = JSON.stringify(event);
		let activeRole = localStorage.getItem('Role');
		/* New code start */
		if (activeRole == Role.TEAM_MEMBER) {
			localStorage.setItem('membertid', JSON.stringify(this.selectedTeam))
			await this.getViewDetailData();
			if (this.viewDashboard) {
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/dashboard']);
			}
			else {
				this.toastr.info('Info', "You don't have an access of Dashboard", {
					timeOut: 3000,
				});
				this.setTeamsActiveTab();
				this.router.navigate(['/teams/member/team-details']);
			}
		} else {
			this.getTeamInfo();
			this.setTeamsActiveTab();
			this.router.navigate(['/teams/dashboard']);
		}
		/* New code end */

		// const roleArr = this.getRoles();
		// if (!roleArr.includes(Role.TEAM_MANAGER) &&
		//   roleArr.includes(Role.TEAM_MEMBER)) {
		//     this.setTeamsActiveTab();
		//   this.router.navigate(['/teams/member/team-details'])
		// }
		// else if (roleArr.includes(Role.TEAM_MANAGER) &&
		//   roleArr.includes(Role.TEAM_MEMBER) &&
		//   activeRole == Role.TEAM_MEMBER) {
		//     this.setTeamsActiveTab();
		//   this.router.navigate(['/teams/member/team-details'])
		// }
		// else {
		//   this.getTeamInfo();
		//   this.setTeamsActiveTab();
		//   this.router.navigate(['/teams/dashboard']);
		// }
	}

	getTeamInfo() {
		this.teamService.getteamInfoById(this.team_id).subscribe((res: any) => {
			this.teamInfo = res[0];
			this.updateToTeamsModule();
			this.getTeamMember(this.team_id);
		}, error => {

		})
	}
	getTeamMember(id) {
		this.teamService.getTeam(id).subscribe((res: any) => {
			this.dataSource = res;
			this.updateToTeamsModule();
		}, err => {
			this.configService.setData({ teamList: [], teamData: this.teamInfo, teamId: this.team_id });

		})
	}

	updateToTeamsModule() {
		this.configService.setData({ teamList: this.dataSource, teamData: this.teamInfo, teamId: this.team_id });
	}

	getRoles() {
		const accessToken = this.authService.getAccessToken();
		const decoded: any = jwt_decode(accessToken);
		return decoded.Groups;
	}

	setTeamsActiveTab() {
		setTimeout(() => { this.teamActiveTabUrl = this.router.url }, 1000) //for showing Explore or Design tab active
	}
}
