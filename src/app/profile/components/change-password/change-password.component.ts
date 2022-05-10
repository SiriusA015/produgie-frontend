import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  MatDialogRef
} from '@angular/material/dialog';
import {
  CustomValidators
} from 'ngx-custom-validators';
import {
  ConfigService
} from 'src/app/shared/service/config.service';
import {
  environment
} from 'src/environments/environment';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password = new FormControl(
    '',
    [
      Validators.required,
      CustomValidators.rangeLength([6, 20]),
    ]
  );
  newPassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 20])  , CustomValidators.notEqualTo(this.password)]);
  passwordForm: FormGroup;

  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(public dialogRef: MatDialogRef < ChangePasswordComponent > ,
    private http: HttpClient,
    private configService: ConfigService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      oldPassword: this.password,
      newPassword: this.newPassword,
      confirmPassword: this.fb.control(null, [Validators.required, CustomValidators.equalTo(this.newPassword)])
    });
  }

  changePassword() {
    this.configService.setConfig({
      isLoader: true
    });
    const payload = this.passwordForm.value;

    this.http.post(`${environment.baseurl}/user/change-password`, payload)
      .subscribe(
        (res:any) => {
          this.configService.setConfig({
            isLoader: false
          });
          this.openSnackBar(res?.message);
          this.dialogRef.close();
        },
        err => {
          console.error(err);
          this.configService.setConfig({
            isLoader: false
          });
          this.openSnackBar(err.error.message);
        }
      );
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok');
  }

}
