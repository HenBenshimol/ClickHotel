import {Component, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {GuestService} from '../../services/guest.service';
import {Guest} from '../../shared/models/guest.model';

import {HotelsService} from '../../services/hotels.service';
import {Hotel} from '../../shared/models/hotel.model';


@Component({
  selector: 'app-hotelInfo',
  templateUrl: './hotelInfo.component.html'
})
export class HotelInfoComponent implements OnInit {

  @Output('hotelInfoModal') hotelInfoModal: HTMLElement;

  isLoading = true;
  hotels: Hotel[];
  hotel: Hotel;
  
  constructor(private auth: AuthService,
              private guestService: GuestService,
              private hotelService: HotelsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              public toast: ToastComponent) { }

              ngOnInit() {
                this.hotelService.getHotelByName(this.auth.currentGuest.hotelName).subscribe((hotel) => {
                  this.hotel = hotel;
                }, (err) => {
                  console.log(err);
              });
            
              // getHotels() {
              //   this.hotelService.getHotels().subscribe(
              //     data => this.hotels = data,
              //     error => console.log(error),
              //     () => this.isLoading = false
              //   );
              // }

              
            }

          
  }
