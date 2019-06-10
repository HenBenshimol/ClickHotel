import {Component, OnInit} from '@angular/core';

import {GuestService} from '../../services/guest.service';
import {HotelsService} from '../../services/hotels.service';
import {FormBuilder} from '@angular/forms';
import {ToastComponent} from '../../shared/toast/toast.component';
import {Hotel} from '../../shared/models/hotel.model';
import { app } from 'server/app';

@Component({
  selector: 'app-guest-analytics',
  templateUrl: './guestAnalytics.component.html',
  styleUrls: ['./guestAnalytics.component.scss']
})

export class GuestAnalyticsComponent implements OnInit {
  constructor(private guestService: GuestService) { }

  vectors: Array<Number>;
  centroids: Array<Array<Number>>;
  idxs: Array<Array<Number>>;

  ngOnInit() {

    this.guestService.getGuestVector().subscribe((guestVector) => {
      this.vectors = guestVector;

      // k means func here
      console.log('Vectors: ' + this.vectors);


      const skmeans = require('../../../../node_modules/skmeans');

      const resu = skmeans(this.vectors, 4);
      this.centroids = resu.centroids;
      this.idxs = resu.idxs;

      console.log(resu);

      console.log(this.centroids);
      console.log(this.idxs);
    });

  }
}
