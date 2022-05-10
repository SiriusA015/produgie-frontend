import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../../service/profile.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangePictureComponent } from '../change-picture/change-picture.component';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
})
export class GeneralSettingsComponent implements OnInit {
  picture = null;
  profileForm: FormGroup;
  data: Object;
  imageData: any;
  isImageshow: boolean = false;
  imageurl: any;
  imageExist: boolean;
  isAllowedToChangePassword: boolean = false;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private configService: ConfigService,
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {}

  async ngOnInit() {
    this.profileForm = this.fb.group({
      // salutation: this.fb.control(null, Validators.required),
      // salutation: [' ', Validators.pattern(/^(?!\s|.*\s$).*$/)] ,
      salutation:['', [Validators.required, Validators.pattern(/^\S/)]],
      // name: this.fb.control(null, Validators.required),
      name:['', [Validators.required, Validators.pattern(/^\S/)]],
      email: this.fb.control({ value: null, disabled: true },Validators.required),
    });

    this.getMyProfile();
    await this.isAllowToChangePassword();
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { right: '0', top: '76px' },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  openChangePictureDialog() {
    const dialogRef = this.dialog.open(ChangePictureComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { right: '0', top: '76px' },
    });

    dialogRef.afterClosed().subscribe((result) => {

      this.triggerProfileUpdate();
    });
  }

  triggerProfileUpdate() {

    this.profileService.sharedimageUrl.subscribe((data: any) => {

        if (localStorage.getItem('imageurl') === 'undefined') {

          this.imageData = `/assets/avatars/${localStorage.getItem('picture')}.svg`;

        } else {
          this.imageData = environment.baseurl+localStorage.getItem('imageurl');
        }
    });

  }

  getMyProfile() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${environment.baseurl}/user/me`).subscribe(
      (res: any) => {
        this.profileForm.setValue({
          salutation: res.salutation ? res.salutation : null,
          name: res.fullName,
          email: res.email,
        });
        this.picture = res.avatar;

        localStorage.setItem('picture', this.picture);
        this.imageurl = res.imageUrl;
        this.http.get(`${environment.baseurl}` + this.imageurl).subscribe(
          (res: any) => {},
          (err) => {
            this.imageExist = err.status == 200;

            if (this.imageurl) {
              if (this.imageExist == true) {
                this.imageData = `${environment.baseurl}` + this.imageurl;
              } else {
                // this.imageData = '/assets/avatars/avatar_10.svg';
                this.imageData =
                  '/assets/avatars/' + localStorage.getItem('picture') + '.svg';
              }
            } else if (
              this.imageurl === undefined &&
              this.picture === undefined
            ) {
              this.imageData = '/assets/avatars/avatar_10.svg';
            } else if (this.picture === undefined) {
              this.imageData = `${environment.baseurl}` + this.imageurl;
            } else {
              this.imageData =
                '/assets/avatars/' + localStorage.getItem('picture') + '.svg';
            }
            this.configService.setConfig({ isLoader: false });
            // window.location.reload();
          }
        );
      },
      (err) => {
        console.log(err);
        this.configService.setConfig({ isLoader: false });
      }
    );
  }

  updateProfile() {
    this.configService.setConfig({ isLoader: true });

    const payload = this.profileForm.value;
    localStorage.setItem('preferedName',payload.salutation);


    this.profileService.setprefferedname({preferedName: payload.salutation });

    payload.fullName =  payload.name;

    this.http.patch(`${environment.baseurl}/user/profile`, payload).subscribe(
      (res) => {
        this.getMyProfile();
        // this.configService.setConfig({ updateProfile: true });
        // window.location.reload();
      },
      (err) => {
        console.error(err);
        this.configService.setConfig({ isLoader: false });
      }
    );
  }

  async isAllowToChangePassword() {

    try{
      const isAllowed:any = await this.http.get(`${environment.baseurl}/user/allow-change-password`).toPromise();
      this.isAllowedToChangePassword = isAllowed.allow;
    } catch(err) {
      this.isAllowedToChangePassword = false;
      console.log("error section", err);
    }
  }
}
