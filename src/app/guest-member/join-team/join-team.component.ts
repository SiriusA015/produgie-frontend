import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { DEFAULT_ERROR_MSG } from '../../constant';

declare const $: any;

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss'],
})
export class JoinTeamComponent implements OnInit {
  error: string;
  errorDescription: string;
  apiError: string;
  apiSuccess: string;
  showErrorMessage: boolean = false;
  loading: boolean = true;
  queryParams: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queries) => {
        this.loading = false;
        this.queryParams = queries;

        if (queries.error || JSON.stringify(queries) === '{}') {
          this.error = queries.error || DEFAULT_ERROR_MSG;
          this.errorDescription = queries.error_description;
        }
        /* Mark as a guest user */
        const decodedToken: any = jwt_decode(this.queryParams.token);
        localStorage.setItem('user-type', 'guest');
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('userName', decodedToken.name);
      },
      (err) => {
        this.loading = false;
        this.apiError = err.error.errorMessage || DEFAULT_ERROR_MSG;
        this.toastr.error(this.apiError, '', {
          timeOut: 3000,
        });
      }
    );
  }

  joinTeam(resp: any) {
    let actionValue = resp.srcElement.value;
    let callbackURL = `${environment.teamBaseUrl}/guest/join-team?status=${actionValue}&id=${this.queryParams.id}&token=${this.queryParams.token}&type=${this.queryParams.type}`;

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
        this.apiError = err.error.errorMessage || DEFAULT_ERROR_MSG;
        this.loading = false;
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
