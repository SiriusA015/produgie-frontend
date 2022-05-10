import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-policy-consent',
  templateUrl: './policy-consent.component.html',
  styleUrls: ['./policy-consent.component.scss']
})
export class PolicyConsentComponent implements OnInit {

  isChecked = false;
  isLoading = false;

  constructor(private http: HttpClient, 
              private router: Router, 
              private configService: ConfigService, 
              private snackBar: MatSnackBar,
              private authService: AuthService ) { }

  ngOnInit(): void {
  }
  accept() {
    this.isLoading = true;
    this.configService.setConfig({ isLoader: true });
    const authToken = this.authService.getAccessToken();
    if (this.isChecked) {
      this.http.patch(`${environment.baseurl}/user/consent`, {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }).subscribe(
        res => {
          this.isLoading = false;
          this.configService.setConfig({ isLoader: false });
          this.router.navigate(['/profile/general-settings']);
        },
        err => {
          this.isLoading = false;
          this.configService.setConfig({ isLoader: true });
          console.error(err);
        }
      );
    }
  }

  toggleChecked() {
    this.isChecked = !this.isChecked;
  }
  checkConsent(){
    if (!this.isChecked) {
      this.openSnackBar('Please agree to continue');
    }
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }
  closeSnackbar(){
    this.snackBar.dismiss();
  }

  signOut() {
    this.authService.signOut();
  }
}
