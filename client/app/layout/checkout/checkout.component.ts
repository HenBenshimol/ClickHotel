import {Component, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Room } from '../../shared/models/room.model';
import { GuestService } from '../../services/guest.service';
import { RoomService } from '../../services/room.service';
import { RankingService } from '../../services/ranking.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Guest } from 'client/app/shared/models/guest.model';
import HotelsCtrl from 'server/controllers/hotels';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  @Input('checkoutModal') checkoutModal: HTMLElement;
  checkoutForm: FormGroup;
  userId = this.auth.currentUser._id;
  comment = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100),
  ]);
  ranking =  new FormControl('', [
    Validators.required
  ]);
  hotelName = this.auth.currentGuest.hotelName;
  roomId = this.auth.currentGuest.roomId;

  room: Room;
  newGuest: Guest;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              public toast: ToastComponent,
              private guestService: GuestService,
              private roomService: RoomService,
              private rankingServie: RankingService,
              private auth: AuthService) { }

  ngOnInit() {
      this.checkoutForm = this.formBuilder.group({
      userId: this.userId,
      hotelName: this.hotelName,
      roomId: this.roomId,
      comment: this.comment,
      ranking: this.ranking
    });
  }

  //Validation
  setClassComment() {
    return { 'has-danger': !this.comment.pristine && !this.comment.valid };
  }

  setClassRanking() {
    return { 'has-danger': !this.ranking.pristine && !this.ranking.valid };
  }

  checkout() {
    //Update guest - not active
    this.newGuest = this.auth.currentGuest;
    this.newGuest.activeGuest = false;

    this.guestService.editGuest(this.newGuest).subscribe(
      (res) => {
        console.log('guest is not active!');
      },
      error => console.log(error)
    );

    //Update room - available
    this.roomService.getRoomById(this.roomId).subscribe((room) => {
      this.room = room;
      this.room.availability = true;
      this.room.userId = null;

      this.roomService.editRoom(this.room).subscribe(
        (res) => {
          console.log('room is available!');
        },
        error => console.log(error)
      );
    }, (err) => {
      console.log(err);
    });

    // Checkout and ranking the hotel
    this.rankingServie.checkout(this.checkoutForm.value).subscribe(
      res => {        
        this.auth.checkout();
        console.log("auto checkout");
        console.log('successfully checked-out!');
        this.toast.setMessage('you successfully checked-out!', 'success');
        this.modalService.dismissAll('');
      },
      error => this.toast.setMessage('error', 'danger')
    );
  }
}