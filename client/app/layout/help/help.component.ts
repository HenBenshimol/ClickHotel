import { Component, OnInit, Output } from '@angular/core';
import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { Hotel } from '../../shared/models/hotel.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { HotelsService } from 'client/app/services/hotels.service';
import {GuestService} from '../../services/guest.service';
import {Guest} from '../../shared/models/guest.model';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html'
})
export class HelpComponent implements OnInit {

  @Output('helpModal') helpModal: HTMLElement;

  hotel = new Hotel();

  constructor(private auth: AuthService,
              public toast: ToastComponent,
              private modalService: NgbModal,
              private hotelService: HotelsService,
              private guestService: GuestService,
              private userService: UserService) { }

              
  ngOnInit() {
    this.hotelService.getHotelByName(this.auth.currentGuest.hotelName).subscribe((hotel) => {
    this.hotel = hotel;
    }, (err) => {
        console.log(err);
      });
    }
  }
