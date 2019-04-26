import {Component, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


import { Room } from '../../shared/models/room.model';
import { GuestService } from '../../services/guest.service';
import { RoomService } from '../../services/room.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Guest } from 'client/app/shared/models/guest.model';



@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html'
})
export class CheckinComponent implements OnInit {

  @Input('checkinModal') checkinModal: HTMLElement;
  checkinForm: FormGroup;
  userId = this.auth.currentUser._id;
  hotelName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  checkinDate = new FormControl('', [
    Validators.required
  ]);
  checkoutDate = new FormControl('', [
    Validators.required
  ]);
  roomId: string;
  room: Room;
  activeGuest = true;
  newGuet: Guest;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              public toast: ToastComponent,
              private guestService: GuestService,
              private roomService: RoomService,
              private auth: AuthService) { }

  ngOnInit() {
    this.checkinForm = this.formBuilder.group({
      userId: this.userId,
      hotelName: this.hotelName,
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate,
      activeGuest: this.activeGuest,
      roomId: null
    });
  }

  //Validation
  setClassHotelname() {
    return { 'has-danger': !this.hotelName.pristine && !this.hotelName.valid };
  }

  setClassCheckinDate() {
    return { 'has-danger': !this.checkinDate.pristine && !this.checkinDate.valid };
  }

  setClassCheckoutDate() {
    return { 'has-danger': !this.checkoutDate.pristine && !this.checkoutDate.valid };
  }

  checkin() {
    // Get available room in the hotel
    this.roomService.getRandomRoom(this.hotelName.value).subscribe((room) => {
        this.room = room;
        this.roomId = room._id;
        this.room.userId = this.auth.currentUser._id;
        this.room.availability = false;

        // Change the availability of the room to false and connect to user ID
        this.roomService.editRoom(this.room).subscribe(
          (res) => {
            console.log('room saved!');
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );

    // Create the new guest
    this.guestService.checkin(this.checkinForm.value).subscribe(
      res => {
        // connect between the guest to the room (for History)
        this.guestService.getActiveGuest(this.auth.currentUser._id).subscribe((guest) => {
            this.newGuet = guest;
            this.newGuet.roomId = this.roomId;
            this.guestService.editGuest(this.newGuet).subscribe(
              (res) => {
                this.auth.checkIn();
                console.log('roomid in user saved!');
              },
              error => console.log(error)
            );
        }, (err) => {
          console.log(err);
        });

        console.log('successfully checked-in!');
        this.toast.setMessage('you successfully checked-in!', 'success');
        this.modalService.dismissAll('');
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );

  }
}
