import {Component, OnInit} from '@angular/core';

import {GuestService} from '../../services/guest.service';
import {HotelsService} from '../../services/hotels.service';
import {FormBuilder} from '@angular/forms';
import {ToastComponent} from '../../shared/toast/toast.component';
import {Hotel} from '../../shared/models/hotel.model';

@Component({
  selector: 'app-guest-analytics',
  templateUrl: './guestAnalytics.component.html',
  styleUrls: ['./guestAnalytics.component.scss']
})

export class GuestAnalyticsComponent implements OnInit {
  constructor(private guestService: GuestService) { }

  //ages: Number[] = [];
  //purposes: Number[] = [];
  //status: Number[] = [];
  //vacationLength: Number[] = [];
  vectors: Array<Number>;

  ngOnInit() {

    this.guestService.getGuestVector().subscribe((guestVector) => {
      this.vectors = guestVector;
      
      // k means func here
      console.log("testi " + this.vectors);


      const kmeans = require('../../../../node_modules/node-kmeans');

      kmeans.clusterize(this.vectors, {k: 4}).subscribe((data) => {
        console.log('data test ' + data);
      }, (err) => {
        console.log(err);
      });

      kmeans.clusterize(this.vectors, {k: 4}, (err, res) => {
        if (err) { console.error(err); } else { console.log('%o', res); }
      }); 
    });

    /*// Data source: LinkedIn
    const data = [
      {'Age': this.ages[0] , 'Purposes': this.purposes[0].valueOf , 'FamilyStatus': this.status[1], 'VacationLength': this.vacationLength[0]},
      //{'Age': this.ages[1] , 'Purposes': this.purposes[1], 'FamilyStatus': this.status[2], 'VacationLength': this.vacationLength[1]},
     // {'Age': this.ages[2] , 'Purposes': this.purposes[2], 'FamilyStatus': this.status[3], 'VacationLength': this.vacationLength[2]}
    ];*/
/*
// Create the data 2D-array (vectors) describing the data
    const vectors = new Array();
    for (let i = 0 ; i < data.length ; i++) {
      vectors[i] = [ data[i]['Age'] , data[i]['Purposes']];
    }*/

    

    /*
    this.guestService.getAllGuestAge().subscribe((guestAge) => {
      this.ages = guestAge;
      console.log('guest age ' + this.ages);
    }, (err) => {
      console.log(err);
    });

    this.guestService.getAllGuestPurpose().subscribe((guestPurpose) => {
      this.purposes = guestPurpose;
      console.log('guest purpose ' + this.purposes);
    }, (err) => {
      console.log(err);
    });

    this.guestService.getAllGuestStatus().subscribe((guestStatus) => {
      this.status = guestStatus;
      console.log('guest status ' + this.status);
    }, (err) => {
      console.log(err);
    });

    this.guestService.getAllVacationLength().subscribe((guestVacationLength) => {
      this.vacationLength = guestVacationLength;
      console.log('guest vacationLength ' + this.vacationLength);
    }, (err) => {
      console.log(err);
    });

   
    // Data source: LinkedIn
    const data = [
      {'Age': this.ages[0] , 'Purposes': this.purposes[0].valueOf , 'FamilyStatus': this.status[1], 'VacationLength': this.vacationLength[0]},
      //{'Age': this.ages[1] , 'Purposes': this.purposes[1], 'FamilyStatus': this.status[2], 'VacationLength': this.vacationLength[1]},
     // {'Age': this.ages[2] , 'Purposes': this.purposes[2], 'FamilyStatus': this.status[3], 'VacationLength': this.vacationLength[2]}
    ];

// Create the data 2D-array (vectors) describing the data
    const vectors = new Array();
    for (let i = 0 ; i < data.length ; i++) {
      vectors[i] = [ data[i]['Age'] , data[i]['Purposes']];
    }

    const kmeans = require('../../../../node_modules/node-kmeans');
    kmeans.clusterize(vectors, {k: 4}, (err, res) => {
      if (err) { console.error(err); } else { console.log('%o', res); }
    });*/

  }

}