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
  selector: 'app-roomInfo',
  templateUrl: './roomInfo.component.html'
})
export class RoomInfoComponent implements OnInit {

  // tslint:disable-next-line:no-output-rename
  @Output('roomInfoModal') roomInfoModal: HTMLElement;

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
    this.guest = this.auth.currentGuest;
    this.roomService.getRoomByUserId(this.auth.currentUser._id).subscribe((room) => {
      this.room = room;
    }, (err) => {
      console.log(err);
    });
  }
}
