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
      domain: ["#4a5452","#9db0af"]
  };

  // Var definition
  public multi = [];
  guestAges: Array<number>;
  young:number;
  adult:number;
  guestsTotal:number;

  constructor(private guestService: GuestService) {}
      
  ngOnInit() {
    // get bar graph information
    this.guestService.getAllGuestsByHotelandYear().subscribe((guest) => {
      this.multi = guest;
      console.log(this.multi);
    });

    // get guests ages statiatic
    this.guestService.getAllGuestAge().subscribe((guestVector) => {
      this.guestAges = guestVector;
      this.guestsTotal=this.guestAges.length;

      var createCountMinSketch = require("count-min-sketch")
 
      //Create data structure
      var sketch = createCountMinSketch()

      for (var i=0; i<this.guestAges.length;i++)
      {
        if (this.guestAges[i]>18){
          sketch.update("0",1);
        }
        else
          sketch.update("1",1);
      }
     
      //Query results
      this.adult = sketch.query("0");
      this.young = sketch.query("1");
    });
  }
}