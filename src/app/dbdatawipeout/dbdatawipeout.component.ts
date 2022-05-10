import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dbdatawipeout',
  templateUrl: './dbdatawipeout.component.html',
  styleUrls: ['./dbdatawipeout.component.scss']
})
export class DbdatawipeoutComponent implements OnInit {
  userToken;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userToken = params.token;       
      }
    );
  }

  survey()
  {
    this.http.post(`${environment.baseurl}/sureveyresponse/reset-survey`, {
      headers : {
        Authorization : `Bearer ${this.userToken}`, }
    }).subscribe((res: any) => { 
      this.openSnackBar('Wipeout data Successfully');
    },);
  }

  sprint()
  {
    this.http.post(`${environment.baseurl}/usersprint/reset-sprint`, {
      headers : {
        Authorization : `Bearer ${this.userToken}`, }
    }).subscribe((res: any) => { 
      this.openSnackBar('Wipeout data Successfully');

    },);
  }

  nominee(){
    this.http.post(`${environment.baseurl}/nominee/nominee-reset`, {
      headers : {
        Authorization : `Bearer ${this.userToken}`, }
    }).subscribe((res: any) => { 
      this.openSnackBar('Wipeout data Successfully');

    },);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }

  back() {
    this.router.navigate(['./explore/aboutme'])
  }

  generateReport() {
    this.http.post(`${environment.baseurl}/nomineeresponsescore/generate`, {
      headers : {
        Authorization : `Bearer ${this.userToken}`, }
    }).subscribe((res: any) => { 
      this.openSnackBar('Report generated successfully');
    });
  }

  deleteReport() {
    this.http.delete(`${environment.baseurl}/nomineeresponsescore/reset-report`, {
      headers : {
        Authorization : `Bearer ${this.userToken}`, }
    }).subscribe((res: any) => { 
      this.openSnackBar('Report deleted successfully');
    });
  }
}
