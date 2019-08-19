import {Component, OnInit} from '@angular/core';
import 'rxjs/add/observable/of';

import {GuestService} from '../../services/guest.service';
import {HotelsService} from '../../services/hotels.service';
import {FormBuilder} from '@angular/forms';
import {ToastComponent} from '../../shared/toast/toast.component';
import {Hotel} from '../../shared/models/hotel.model';
import { app } from 'server/app';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {


  isLoading = false;
  view: any[] = [1200, 250];

  title: any;
  showLabels: any;
  explodeSlices: any;
  doughnut: any;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Hotel Name';
  showYAxisLabel = true;
  yAxisLabel = 'Rooms Count';
  timeline = true;

  colorScheme = {
      domain: []
  };
  public singlePie = [];

  dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

public multi = [
  {
    "name": "Cramim",
    "series": [
      {
        "name": "2018",
        "value": 50
      }
    ]
  },
  {
    "name": "Agamim",
    "series": [
      {
        "name": "2018",
        "value": 80
      }
    ]
  },
  {
    "name": "Queen of sheba	",
    "series": [
      {
        "name": "2018",
        "value": 20
      }
    ]
  },
  {
    "name": "Beresheet",
    "series": [
      {
        "name": "2018",
        "value": 15
      }
    ]
  },
  {
    "name": "Hilton Tel Aviv",
    "series": [
      {
        "name": "2018",
        "value": 96
      }
    ]
  }
];

  constructor(private guestService: GuestService) { }

  ngOnInit() {
    //   var arr=[];
    //   arr.push(
    //       {"name":'Amit',"Id":24},
    //       {"name":'Gal',"Id":55}
    //       );
        // this.colorScheme.domain.push(this.dynamicColors())
        // this.singlePie = arr;
        // console.log(this.singlePie);

        
          
  }
}