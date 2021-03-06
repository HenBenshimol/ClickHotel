import {Component, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {HotelsService} from '../../services/hotels.service';


import {Room} from '../../shared/models/room.model';
import {GuestService} from '../../services/guest.service';
import {RoomService} from '../../services/room.service';
import {ToastComponent} from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Guest} from 'client/app/shared/models/guest.model';
import {Hotel} from '../../shared/models/hotel.model';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  minDate: string;
  minDateForCheckOut: string;
  submitted = false;

  @Input('checkinModal') checkinModal: HTMLElement;
  registerForm: FormGroup;
  checkinForm: FormGroup;
  userId = this.auth.currentUser._id;
  hotelName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
/*   checkinDate = new FormControl('', [
    Validators.required,

  ]); */
  checkoutDate = new FormControl('', [
    Validators.required
  ]);
  fullName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  ID = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9\\s]*'),
    Validators.minLength(9),
    Validators.maxLength(9)
  ]);
  age = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9\\s]*'),
    Validators.minLength(1),
    Validators.maxLength(3)
  ]);
  guestStatus = new FormControl('', [
    Validators.required
  ]);
  guestPurpose = new FormControl('', [
    Validators.required
  ]);
  guestNumber = new FormControl('', [
    Validators.required,
    Validators.pattern('[1-9\s]*')
  ]);

  roomId: string;
  room: Room;
  activeGuest = true;
  newGuet: Guest;
  hotelsName: Hotel[];

  selectedCategory: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              public toast: ToastComponent,
              private guestService: GuestService,
              private roomService: RoomService,
              private hotelService: HotelsService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.hotelService.getHotels().subscribe((hotelsName) => {
      this.hotelsName = hotelsName;
    }, (err) => {
      console.log(err);
    });
    this.getCurrentDay();
    this.checkinForm = this.formBuilder.group({
      userId: this.userId,
      ID: this.ID,
      hotelName: this.hotelName,
      checkinDate: this.minDate,
      checkoutDate: this.checkoutDate,
      activeGuest: this.activeGuest,
      roomId: null,
      fullName: this.fullName,
      age: this.age,
      guestStatus: this.guestStatus,
      guestPurpose: this.guestPurpose,
      guestNumber: this.guestNumber
    });


  }

  private getCurrentDay() {
    const today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString();
    const yyyy = today.getFullYear();

    if (+dd < 10) {
      dd = '0' + dd;
    }
    if (+mm < 10) {
      mm = '0' + mm;
    }

    this.minDate = yyyy + '-' + mm + '-' + dd;
    const day = today.getDate() + 1;
    this.minDateForCheckOut = yyyy + '-' + mm + '-' + day;
  }

  // Validation
  setClassHotelname() {
    return {'has-danger': !this.hotelName.pristine && !this.hotelName.valid};
  }

/*   setClassCheckinDate() {
    return {'has-danger': !this.checkinDate.pristine && !this.checkinDate.valid};
  }
 */
  setClassCheckoutDate() {
    return {'has-danger': !this.checkoutDate.pristine && !this.checkoutDate.valid};
  }

  setClassFullName() {
    return {'has-danger': !this.fullName.pristine && !this.fullName.valid};
  }

  setClassID() {
    return {'has-danger': !this.ID.pristine && !this.ID.valid};
  }

  setClassAge() {
    return {'has-danger': !this.age.pristine && !this.age.valid};
  }

  setClassGuestStatus() {
    return {'has-danger': !this.guestStatus.pristine && !this.guestStatus.valid};
  }

  setClassGuestPurpose() {
    return {'has-danger': !this.guestPurpose.pristine && !this.guestPurpose.valid};
  }

  setClassGuestNumber() {
    return {'has-danger': !this.guestNumber.pristine && !this.guestNumber.valid};
  }

  checkin() {
    // Get available room in the hotel
    this.submitted = true;
    if (this.checkinForm.invalid) {
      return;
    }

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
