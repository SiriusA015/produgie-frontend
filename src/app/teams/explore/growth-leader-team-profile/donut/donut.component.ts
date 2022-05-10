import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from 'src/app/profile/service/profile.service';
import { RankService } from 'src/app/explore/service/rank.service';
import { SharedDonutReportComponent } from 'src/app/shared/components/shared-donut-report/shared-donut-report.component';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;

  @Input() picture = 'avatar_10';
  message: any;
  @Input() rankChecked;
  @Input() perform: any[] = [];
  @Input() transform: any[] = [];
  @Input() energize: any[] = [];
  @Input() iconmapping: any;
  selectedCircluar: any = '';
  profilepic: any;
  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  imageConverted: string;
  filterperform: any;
  filterEnergize: any;

  constructor(
    public dialog: MatDialog,
    public rankService: RankService,
    private profileservice: ProfileService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.triggerProfileUpdate();
  }

  // triggerProfileUpdate() {
  //   this.profileservice.sharedimageUrl.subscribe((data: any) => {
  //     if (localStorage.getItem('imageurl') == 'undefined') {
  //       this.imageConverted = `/assets/avatars/${localStorage.getItem(
  //         'picture'
  //       )}.svg`;
  //     } else {
  //       this.profilepic =
  //         environment.baseurl + localStorage.getItem('imageurl');
  //       this.http.get(this.profilepic).subscribe(
  //         (res: any) => { },
  //         (err) => {
  //           if (err.status == 400) {
  //             this.imageConverted = `/assets/avatars/avatar_10.svg`;
  //           }
  //           else {
  //             toDataURL(this.profilepic, (dataUrl) => {
  //               this.imageConverted = dataUrl;
  //             });
  //           }
  //         }
  //       );

  //     }
  //     function toDataURL(url, callback) {
  //       var xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         var reader = new FileReader();
  //         reader.onloadend = function () {
  //           callback(reader.result);
  //         };
  //         reader.readAsDataURL(xhr.response);
  //       };
  //       xhr.open('GET', url);
  //       xhr.responseType = 'blob';
  //       xhr.send();
  //     }
  //   });
  // }

  ngOnChanges() {
    console.log(this.perform)
    if(this.perform?.length > 0) {
      this.perform.sort((a, b) => {
        if(a.capabilityName > b.capabilityName) return -1;
        if(a.capabilityName < b.capabilityName) return 1;
        return 0
      });
    }

    if(this.energize?.length > 0) {
      this.energize.sort((a, b) => {
        if(a.capabilityName > b.capabilityName) return -1;
        if(a.capabilityName < b.capabilityName) return 1;
        return 0
      });
    }
    
    
    if(this.transform?.length > 0) {
      this.transform.sort((a, b) => {
        if(a.capabilityName > b.capabilityName) return -1;
        if(a.capabilityName < b.capabilityName) return 1;
        return 0
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

    const dialogRef = this.dialog.open(SharedDonutReportComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { top: '76px' },
      data: {data:capability,type:'donought'},
    });

    dialogRef.afterClosed().subscribe((result) => {
       this.selectedCircluar = ' ';
    });
  }

}
