import { DataService } from './../../../service/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-roles',
  templateUrl: './sprint-roles.component.html',
  styleUrls: ['./sprint-roles.component.scss']
})
export class DesignSprintRolesComponent implements OnInit {

  message: any;
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.sharedMessage.subscribe(message => this.message = message);
  }

  editCrew(type) {
    console.log('type' , type)
    // this.router.navigateByUrl(['/design/sprint-crew-role'],{ state: { example: 'bar' } );
    this.router.navigate(['/design/sprint-crew-role'], {
      state: { example: type }
    });
    this.dataService.nextMessage({isEdit: true,crewEdit:true});
  }

}
