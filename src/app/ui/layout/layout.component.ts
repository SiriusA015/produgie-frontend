import { ConfigService } from './../../shared/service/config.service';
import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnChanges {

  config: any;
  loading: boolean;
  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.sharedConfig.subscribe(config => this.config = config);
    //  this.loading = this.config.isLoader
  }

  ngOnChanges(){}

}
