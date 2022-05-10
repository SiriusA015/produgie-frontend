import { SharedDetailedReportComponent } from './../../../../shared/components/shared-detailed-report/shared-detailed-report.component';
import { RankService } from './../../../service/rank.service';
import { FocusAreaDetailsComponent } from './../modals/focus-area-details/focus-area-details.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/profile/service/profile.service';

@Component({
  selector: 'app-snapshot-circle',
  templateUrl: './snapshot-circle.component.html',
  styleUrls: ['./snapshot-circle.component.scss'],
})
export class SnapshotCircleComponent
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
  profilepic: any;
  // converting to base64 img
  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  windowOPen: boolean;
  imageConverted: string;

  constructor(
    public dialog: MatDialog,
    public rankService: RankService,
    private profileservice: ProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.triggerProfileUpdate();
 }

  triggerProfileUpdate() {
    this.profileservice.sharedimageUrl.subscribe((data: any) => {
      if (localStorage.getItem('imageurl') == 'undefined') {
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
                // this.imageConverted = `/assets/avatars/avatar_10.svg`;
                this.imageConverted = `/assets/avatars/${localStorage.getItem(
                  'picture'
                )}.svg`;
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
    const dialogRef = this.dialog.open(SharedDetailedReportComponent, {
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
