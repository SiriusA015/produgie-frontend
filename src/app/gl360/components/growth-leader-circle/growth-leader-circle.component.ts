import { BenchmarkModalComponent } from './../../modals/benchmark-modal/benchmark-modal.component';
import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RankService } from 'src/app/explore/service/rank.service';
import { SharedDetailedReportComponent } from 'src/app/shared/components/shared-detailed-report/shared-detailed-report.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/profile/service/profile.service';

@Component({
  selector: 'app-growth-leader-circle',
  templateUrl: './growth-leader-circle.component.html',
  styleUrls: ['./growth-leader-circle.component.scss'],
})
export class GrowthLeaderCircleComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;

  @Input() picture = 'avatar_10';
  message: any;
  @Input() capabilities = [];
  @Input() rankChecked;
  @Input() recommendChecked;
  @Input() perform: any[] = [];
  @Input() transform: any[] = [];
  @Input() energize: any[] = [];
  filteredCapabalities = [];
  selectedCircluar: any = '';
  profile: any;
  imageExist: boolean;
  profilepic: string;
  imageConverted: string;

  constructor(
    public dialog: MatDialog,
    public rankService: RankService,
    private profileService: ProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log(this.rankChecked);
    this.triggerProfileUpdate();
    // this.picture = localStorage.getItem('picture');
    // this.picture = 'avatar_10';
    // console.log(this.picture, 'img');

    // this.profileService.sharedimageUrl.subscribe((data: any) => {
    //   this.profilepic = data.imageUrl;
    // });
    // this.profileservice.getimagedata().subscribe((res) => {
    //   this.profile = res.imageUrl;

    //   this.http.get(`${environment.baseurl}` + this.profile).subscribe(
    //     (res: any) => {},
    //     (err) => {
    //       this.imageExist = err.status == 200;
    //       // if (this.profile) {
    //       //   if (this.imageExist == true) {
    //       //     this.profilepic = `${environment.baseurl}` + this.profile;
    //       //   } else {
    //       //     this.profilepic = '/assets/avatars/avatar_10.svg';
    //       //   }
    //       // } else if (this.profile === undefined && this.picture === undefined) {
    //       //   this.profilepic = '/assets/avatars/avatar_10.svg';
    //       // } else {
    //       //   this.profilepic =
    //       //     '/assets/avatars/' + localStorage.getItem('picture') + '.svg';
    //       // }
    //       if (this.profile) {
    //         if (this.imageExist == true) {
    //           this.profilepic = `${environment.baseurl}` + this.profile;
    //         } else {
    //           // this.profilepic = '/assets/avatars/avatar_10.svg';
    //           this.profilepic =
    //             '/assets/avatars/' + localStorage.getItem('picture') + '.svg';
    //         }
    //       } else if (this.profile === undefined && this.picture === undefined) {
    //         this.profilepic = '/assets/avatars/avatar_10.svg';
    //       } else if (this.picture === undefined) {
    //         this.profilepic = `${environment.baseurl}` + this.profile;
    //       } else {
    //         this.profilepic =
    //           '/assets/avatars/' + localStorage.getItem('picture') + '.svg';
    //       }
    //     }
    //   );
    // });
  }

  triggerProfileUpdate() {
    this.profileService.sharedimageUrl.subscribe((data: any) => {
      if (localStorage.getItem('imageurl') == 'undefined') {
        // this.profilepic = '/assets/avatars/avatar_10.svg';
        this.imageConverted = `/assets/avatars/${localStorage.getItem(
          'picture'
        )}.svg`;
      } else {
        this.profilepic =
          environment.baseurl + localStorage.getItem('imageurl');

          this.http.get(this.profilepic).subscribe(
            (res: any) => {},
            (err) => {
              console.log(err.status);
              if(err.status == 400)
              {
                this.imageConverted = `/assets/avatars/avatar_10.svg`;
              }
              else{
                toDataURL(this.profilepic, (dataUrl) => {
                  console.log('RESULT:', dataUrl);
                  this.imageConverted = dataUrl;
        
                  console.log('RESULTafter:', this.imageConverted);
                });
              }
            }
          );
      }
      // const profiofilepic = profileimage.src;
      function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          var reader = new FileReader();
          reader.onloadend = function () {
            callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
      }
});
  }

  ngOnChanges() {
    if (this.perform?.length > 0) {
      this.perform.sort((a, b) => {
        if (a.capability.id < b.capability.id) return -1;
        if (a.capability.id > b.capability.id) return 1;
        return 0;
      });
    }
    if (this.energize?.length > 0) {
      this.energize.sort((a, b) => {
        if (a.capability.id < b.capability.id) return -1;
        if (a.capability.id > b.capability.id) return 1;
        return 0;
      });
    }

    if (this.transform?.length > 0) {
      this.transform.sort((a, b) => {
        if (a.capability.id > b.capability.id) return -1;
        if (a.capability.id < b.capability.id) return 1;
        return 0;
      });
    }
  }

  ngAfterViewInit() {
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height =
        this.wrapper.nativeElement.offsetWidth + 'px';
    }
  }
  onResize() {
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height =
        this.wrapper.nativeElement.offsetWidth + 'px';
    }
  }
  openDetailsDialog(selectedCircluarValue, capability: any) {
    this.selectedCircluar = selectedCircluarValue;
    console.log(this.selectedCircluar);
    const dialogRef = this.dialog.open(BenchmarkModalComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { right: '0', top: '76px' },
      data: capability,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.selectedCircluar = ' ';
    });
  }
}
