import {Component, OnInit} from '@angular/core';
import {KostaldataService} from './services/kostaldata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plentiwatch';

  plenticoreData;

  constructor(
    private penticoreService: KostaldataService
  ) {
  }

  ngOnInit() {
    this.fetchNewData();
  }


  fetchNewData() {
    this.penticoreService.getApiData().subscribe(
      data => {
        this.plenticoreData = data;
        console.log(data)
      });
  }
}
