import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExploreService } from 'src/app/teams/explore/explore.service';
import { AlignmentSurveyComponent } from 'src/app/teams/explore/team-portal/alignment-survey/alignment-survey.component';

declare const $: any;

@Component({
  selector: 'app-align-survey',
  templateUrl: './align-survey.component.html',
  styleUrls: ['./align-survey.component.scss'],
})
export class AlignSurveyComponent implements OnInit {
  error: string;
  errorDescription: string;
  apiError: any;
  apiSuccess: any;
  showErrorMessage: boolean = false;
  loading: boolean = true;
  queryParams: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private exploreService: ExploreService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queries) => {
      this.queryParams = queries;
      if (queries.error) {
        this.error = queries.error;
        this.errorDescription = queries.error_description;
      }
    });
    this.openDialog();
  }

  openDialog() {
    let questionParams = {
      pageNo: 1,
      pageSize: 10,
      direction: 'ASC',
      sortBy: 'id',
      user_id: this.queryParams.user_id,
      team_id: this.queryParams.team_id,
      user_type: this.queryParams.type,
    };
    this.exploreService.getQuestionsData(questionParams).subscribe(
      (res: any) => {
        this.loading = false;
        const dialogRef = this.dialog.open(AlignmentSurveyComponent, {
          id: 'survey',
          maxWidth: '100vw',
          maxHeight: '100vh',
          height: '100%',
          width: '100%',
          panelClass: 'custom-container',
          data: {
            params: this.queryParams,
            questionData: res,
          },
        });

        dialogRef.afterClosed().subscribe((dialogResult) => {
          // $('#loader').hide();
          // $('#newBlock').show();
          // $('#logo').show();
          this.loading = false;
        });
      },
      (err) => {
        // $('#loader').hide();
        // $('#newBlock').show();
        // $('#logo').show();
        // this.toastr.error('Error', err.error.errorMessage, {
        //   timeOut: 3000,
        // });
        this.loading = false;
      }
    );
  }

  closeWindow() {
    this.router.navigate(['/auth/login']);
  }
}
