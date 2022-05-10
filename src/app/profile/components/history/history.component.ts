import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { CohortDialogComponent } from '../dialog-components/cohort-dialog/cohort-dialog.component';
// import { ManagementService } from "../services/management.service";
// import { DeleteCohortComponent } from "../dialog-components/delete-cohort/delete-cohort.component";
import { MatSort, Sort } from '@angular/material/sort';
import { debounce } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/service/config.service';
import { IgxCollapsibleIndicatorTemplateDirective } from 'igniteui-angular';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

	displayedColumns: string[] = ['no', 'developmentPlan', 'focusSprint', 'date', 'crewMembers', 'endStatus', 'description', 'actions'];
	tableData = [];
	dataSource = new MatTableDataSource<any>(this.tableData);
	serachedSprintData: any = [];
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	searchKey: string;
	paramObject;
	searchObject;
	pageSizeOptions = [10, 20];
	isTableLoading: boolean = false;
	isError: boolean = false;
	totalCohorts: number = 0;
	maxlength: number = 20;

	constructor(
		private router: Router,
		public dialog: MatDialog,
		private toastr: ToastrService,
		private http: HttpClient,
		private configService: ConfigService
	) {
		this.searchInCohort = debounce(this.searchInCohort, 1000);
	}

	ngOnInit(): void {

		this.paramObject = {
			'pageNo': 1,
			'pageSize': 10,
			'sortBy': 'name',
			'direction': 'ASC'
		}

		this.searchObject = {
			'pageNo': 1,
			'pageSize': 20,
			'keyword': 'keyword'
		}
		this.getHistorySprint();
	}

	getHistorySprint() {
		this.configService.setConfig({ isLoader: true });
		this.http
		  .get(`${environment.baseurl}/usersprint/portfolio`)
		  .subscribe(
			(res: any) => {
				this.tableData = res.data;
				this.tableData.map(data=>{
					this.http.get(`${environment.baseurl}/development/get-plan-portfolio/${data.assessmentId}`).subscribe(
						(res1: any) => {
							data.crewNumber = res1.message.crew.length;
							data.focusSprint =  res1.message.sprint.label;
							data.priority =  res1.message.priority;
							data.capability =  res1.message.capability;
							res1.message.capability.map((item, index)=>{
								if (item.id === data.priority){
									let temp = data.capability[0];
									data.capability[0] = item;
									data.capability[index] = temp
								}
							})
							data.isActive =  res1.message.userSprint.isActive;
							data.sprintDescription = res1.message.userSprint.description;
							if (res1.message.userSprint.isFinished){
								data.status = "Completed";
							}else{
								data.status = "Cancelled";
							}
						},
						(err) => {
						  console.log(err);
						  this.router.navigate(['/error/']);
						}
					  );
				})
				this.tableData.sort(function(a, b) {
					a = new Date(a.datetime_from);
					b = new Date(b.datetime_from);
					return a>b ? -1 : a<b ? 1 : 0;
				});
				this.tableData.map((data, index)=>{
					data.id = this.tableData.length - index;

					let descriptionArray = data.description.split(" ");
					let tempDescription = " ";
					if (descriptionArray.length > this.maxlength){
						for (let i=0; i<this.maxlength; i++){
							tempDescription = tempDescription + descriptionArray[i] + " ";
						}
						data.description = tempDescription + "...";
					}
				})
				this.dataSource = new MatTableDataSource<any>(this.tableData);
				this.totalCohorts = this.dataSource.data.length;
				this.configService.setConfig({ isLoader: false });
			},
			(err) => console.log(err)
		  );
	}

	detailSprint(element){
		console.log('this is element', element)
		this.router.navigate(['/profile/sprint-detail/'+ element.assessmentId]);
	}

	searchInCohort(value) {

		this.searchObject = {
			'pageNo': 1,
			'pageSize': this.paramObject.pageSize,
			'keyword': value
		}
		// if (this.searchKey.length >= 3) {
		// 	this.isTableLoading = true;
		// 	this.cohortService.searchInCohort(this.searchObject).subscribe((data: any) => {
		// 		this.isTableLoading = false;
		// 		this.cohortData.data = data.Cohorts;
		// 		this.totalCohorts = data.totalItems;
		// 	}, errors => {
		// 		this.isTableLoading = false;
		// 		if (errors.status != 404) {
		// 			this.toastr.error('Error', errors.error.errorMessage, {
		// 				timeOut: 3000,
		// 			});
		// 		}
		// 		this.cohortData.data = [];
		// 		this.totalCohorts = 0;
		// 	});
		// } else if (this.searchKey.length == 0) {
		// 	this.getCohort();
		// }
	}

	sortData(sort: Sort) {
		this.paramObject = {
			'pageNo': this.paramObject.pageNo,
			'pageSize': this.paramObject.pageSize,
			'sortBy': sort.active,
			'direction': sort.direction
		}
		this.getHistorySprint();
	}

	pageChange(e) {
		this.paramObject = {
			'pageNo': e.pageIndex + 1,
			'pageSize': e.pageSize,
			'sortBy': this.paramObject.sortBy,
			'direction': this.paramObject.direction
		}
		this.getHistorySprint();
	}

	closeHistoryList() {
		this.router.navigateByUrl('/dashboard/my-dashboard');
	}

}
