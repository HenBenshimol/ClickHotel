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

  vectors: Array<Number>;

  ngOnInit() {

    this.guestService.getGuestVector().subscribe((guestVector) => {
      this.vectors = guestVector;

      // k means func here
      console.log('Vectors: ' + this.vectors);


      const skmeans = require('../../../../node_modules/skmeans');

      const res = skmeans(this.vectors,4);

      console.log(res);
    });
  }
}
