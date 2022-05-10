import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

ErrorMessage = "You Don't Have Permission To Perform this Action"; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      queries => {
        if (queries.errMessage) {
         this.ErrorMessage = queries.errMessage;
         
        } 
      }
    );
  }

}
