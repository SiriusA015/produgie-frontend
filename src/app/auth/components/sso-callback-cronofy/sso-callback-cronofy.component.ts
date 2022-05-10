import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare const window: any;

@Component({
  selector: 'app-sso-callback-cronofy',
  templateUrl: './sso-callback-cronofy.component.html',
  styleUrls: ['./sso-callback-cronofy.component.scss']
})
export class SsoCallbackCronofyComponent implements OnInit {
  error: string;
  errorDescription: string;
  type: string;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      queries => {
        if (queries.error) {
          this.error = queries.error;
          this.errorDescription = queries.error_description;
        } else {
          this.authenticate(queries);
        }
      }
    );
  }

  authenticate(queries: any) {

    const authToken = localStorage.getItem('authToken');

    this.route.params.subscribe(
      
      params => {        
        this.type = params.type;
      }
    );
    
    let callbackURL;

    if(this.type == "individual-user") {

      callbackURL = `${environment.baseurl}/cronofy/individual-user/callback?code=${queries.code}&state=${queries.state}`;  
    }  
    else if(this.type == "admin") {

      callbackURL = `${environment.baseurl}/cronofy/enterprise/callback?code=${queries.code}&state=${queries.state}`;  
    }    

    if (queries.code) {

      const headers = {
        headers : {
          Authorization : `Bearer ${authToken}`
        }
      }

      this.http.get(callbackURL, headers)
              .subscribe(
                (res: any) => {
                  console.log(res);
                  if (window.deferredPrompt !== null && window.deferredPrompt !== undefined) {
                    window.deferredPrompt.prompt();
                  }          
                  localStorage.setItem('activeModule', 'LEAD') 
                  this.router.navigate(['/dashboard/my-dashboard']);
                },
                (err: any) => {
                  console.log(err);
                  this.router.navigate(['/auth']);
                }
              );
    }
  }
}