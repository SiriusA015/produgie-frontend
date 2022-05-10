import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss'],
})
export class ChangePictureComponent implements OnInit {
  avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  imgurl: any = '';
  selectedfile: File = null;
  data: any;
  ShowImageSame: string;
  setdata: any;

  constructor(
    public dialogRef: MatDialogRef<ChangePictureComponent>,
    private http: HttpClient,
    private configService: ConfigService,
    private snackBar: MatSnackBar,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.imgurl = localStorage.getItem('picture');
  }

  ngOnInit() {}

  changePicture(num: number) {
    this.http
      .patch(`${environment.baseurl}/user/avatar`, { avatar: 'avatar_' + num })
      .subscribe(
        (res) => {
          localStorage.setItem('imageurl', undefined);
          localStorage.setItem('picture', 'avatar_' + num);

          this.profileService.setImage({ imageUrl: 'avatar_' + num });

          this.configService.setConfig({ isLoader: false });
          this.dialogRef.close();
        },
        (err) => {
          console.error(err);
          this.configService.setConfig({ isLoader: false });
        }
      );
  }

  onFileselected(file: FileList) {
    if (
      file[0].type == 'image/png' ||
      file[0].type == 'image/jpeg' ||
      file[0].type == 'image/jpg'
    ) {
      if (file[0].size < 2000000) {
        this.selectedfile = file.item(0);
        this.ShowImageSame = file.item(0).name;
        this.openSnackBar('Image upload Successfully');
      } else {
        this.openSnackBar('File size should be less than 2 MB');
      }
    } else {
      this.openSnackBar('File not applicable');
      return;
    }
  }

  onUpload() {
    const fd = new FormData();

    fd.append('file', this.selectedfile, this.selectedfile?.name);

    // this.configService.setConfig({ isLoader: true });

    this.http
      .post(`${environment.baseurl}/user/profile-image/`, fd)
      .subscribe((res) => {
        this.openSnackBar('Image upload Successfully');

        this.dialogRef.close(this.selectedfile?.name);

        this.data = res;

        this.getimagedata();
      });
  }

  getimagedata() {
    this.http.get(environment.baseurl + '/user/me').subscribe((res: any) => {
      localStorage.setItem('imageurl', res.imageUrl);

      this.profileService.setImage({ imageUrl: res.imageUrl });

      setTimeout(() => {
        // this.openSnackBar('Image upload Successfully');
        this.configService.setConfig({ isLoader: false });
      }, 3000);
    });
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
