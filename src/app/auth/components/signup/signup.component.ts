import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigService } from './../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../design/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  uuid;
  userToken;
  orgId = 1;
  show: boolean;
  show1: boolean;
  loadCounter = 0;
  password = new FormControl('', [
    Validators.required,
    CustomValidators.rangeLength([6, 20]),
  ]);
  confirmpassword = new FormControl('', [
    Validators.required,
    CustomValidators.equalTo(this.password),
  ]);
  signUpForm = new FormGroup({
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

  validateUser(){
    this.http.get(`${environment.baseurl}/userinvite/validate`, {
      headers : {
        Authorization : `Bearer ${this.userToken}`,
        uuid: `${this.uuid}`
      }
    }).subscribe(
      (res: any) => {
        this.signUpForm.get('email').setValue(res.data);
        this.configService.setConfig({isLoader: false});
      },
      (err) => {
        this.configService.setConfig({isLoader: false});
        this.router.navigate(['/auth/login']);
      }
    );
  }

  register() {
    const payload = {
      password: this.signUpForm.get('password').value,
    };
    if (this.signUpForm.valid) {
      this.loadCounter += 1;
      this.http.post(`${environment.baseurl}/user/register`, payload, {
        headers : {
          Authorization : `Bearer ${this.userToken}`,
          uuid: `${this.uuid}`
        }
      }).subscribe(
        (res: any) => {
          this.loadCounter -= 1;
          this.openSnackBar('Password set successfully');
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
            this.dataService.nextMessage({ signUp: true });
          }, 1500);
        },
        (err) => {
          console.log(err);
          this.openSnackBar(err.message);
          this.loadCounter -= 1;
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
  checkPasswordValid(){
    if (this.signUpForm.get('password').value === ''){
      this.openSnackBar('Please enter password');
    } else if (this.signUpForm.get('confirmpassword').value === ''){
      this.openSnackBar('Please confirm password');
    } else if (this.signUpForm.get('password').value !== this.signUpForm.get('confirmpassword').value){
      this.openSnackBar('Passwords do not match');
    }
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }
}
