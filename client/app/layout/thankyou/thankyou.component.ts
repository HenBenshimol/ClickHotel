import {Component, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {GuestService} from '../../services/guest.service';
import {Guest} from '../../shared/models/guest.model';
import {RoomService} from '../../services/room.service';
import {Room} from '../../shared/models/room.model';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html'
})
export class ThankyouComponent implements OnInit {

  @Output('thankyouModal') thankyouModal: HTMLElement;

  guest: Guest;
  room: Room;

  constructor(private auth: AuthService,
              private guestService: GuestService,
              private roomService: RoomService,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              public toast: ToastComponent) { }

  ngOnInit() {
/*
    this.roomService.getRoomByUserId(this.auth.currentUser._id).subscribe((room) => {
      console.log('getroom');
      this.room = room;
      this.modalService.dismissAll('');
    }, (err) => {
      console.log(err);
    });*/

    this.guestService.getActiveGuest(this.auth.currentUser._id).subscribe((guest) => {
      this.guest = guest;
       console.log(this.guest);
      this.roomService.getRoomById(this.guest.roomId).subscribe((room) => {
        this.room = room;
      }, (err) => {
        console.log(err);
      });

    }, (err) => {
      console.log(err);
    });
  }
}
