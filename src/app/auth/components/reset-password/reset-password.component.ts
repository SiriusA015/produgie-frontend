import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/design/service/data.service';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  show: boolean;
  show1: boolean;
  uuid;
  userToken;
  password = new FormControl(
    '',
    [
      Validators.required,
      CustomValidators.rangeLength([6, 20]),
    ]
  );
  confirmpassword = new FormControl('', [Validators.required, CustomValidators.equalTo(this.password)]);
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidators.email]),
    password: this.password,
    confirmpassword: this.confirmpassword,
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private http: HttpClient,
    private configService: ConfigService,
    private snackBar: MatSnackBar
  ) {
    this.show = false;
    this.show1 = false;
   }

  ngOnInit(): void {
    this.configService.setConfig({isLoader: true});
    this.route.params.subscribe(
      params => {
        console.log(params);
        this.uuid = params.uuid;
        this.userToken = params.token;
        this.validateUser();
      }
    );
  }

  resetPassword() {
    const payload = {
      password: this.resetPasswordForm.get('password').value,
    };
    if (this.resetPasswordForm.valid) {
      this.http.post(`${environment.baseurl}/auth/resetlog/reset`, payload, {
        headers : {
          Authorization : `Bearer ${this.userToken}`,
          uuid: `${this.uuid}`
        }
      }).subscribe(
        (res: any) => {
          this.router.navigate(['/auth/login']);
          this.dataService.nextMessage({ signUp: true });
        },
        (err) => {
          console.log(err);
          // console.log(err);
          // this.isLoading = false;
          this.openSnackBar(err.error.message);
      }
      );
    }
  }
  showpassword() {
    this.show = !this.show;
  }
  showpassword1() {
    this.show1 = !this.show1;
  }

  validateUser(){
    this.http.get(`${environment.baseurl}/auth/resetlog/validate`, {
      headers : {
        Authorization : `Bearer ${this.userToken}`,
        uuid: `${this.uuid}`
      }
    }).subscribe(
      (res: any) => {
        this.resetPasswordForm.get('email').setValue(res.data);
        this.configService.setConfig({isLoader: false});
      },
      (err) => {
        this.configService.setConfig({isLoader: false});
        this.openSnackBar(err.error.message);
      }
    );
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }
}
