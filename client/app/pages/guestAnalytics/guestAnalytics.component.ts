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

  ages: Number[] = [];
  purposes: string[] = [];
  status: string[] = [];
  vacationLength: string[] = [];

  ngOnInit() {
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
  }

}
