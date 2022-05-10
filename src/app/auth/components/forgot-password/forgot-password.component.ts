import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/service/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  btnDisabled = false;
  loadCounter = 0;
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidators.email]),
  });
  constructor(
    private route: Router,
    private http: HttpClient,
    public configService: ConfigService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  sendEmail() {
    if (this.forgotPasswordForm.valid) {
      this.loadCounter += 1;
      this.btnDisabled = true;
      this.http
        .post(
          `${environment.baseurl}/auth/resetlog/forgot`,
          this.forgotPasswordForm.value
        )
        .subscribe(
          (res) => {
            this.openSnackBar(
              'An email has been sent with password reset details'
            );
            this.forgotPasswordForm.reset();
            this.btnDisabled = false;
            this.loadCounter -= 1;
          },
          (err) => {
            this.openSnackBar(err.error.message);
            this.btnDisabled = false;
            this.loadCounter -= 1;
          }
        );
      console.log(this.loadCounter);
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }
}
