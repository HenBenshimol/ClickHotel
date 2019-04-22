import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import {GuestService} from '../../services/guest.service';
import {Guest} from '../../shared/models/guest.model';

@Component({
  selector: 'app-hotelHistory',
  templateUrl: './hotelHistory.component.html',
  styleUrls: ['./hotelHistory.component.scss']
})
export class HotelHistoryComponent implements OnInit {

  guests: Guest[];

  constructor(private guestService: GuestService,
              private auth: AuthService) { }

  ngOnInit() {
    this.guestService.getGuestByUserId(this.auth.currentUser._id).subscribe((guests) => {
      this.guests = guests;
    }, (err) => {
      console.log(err);
    });
  }

}
