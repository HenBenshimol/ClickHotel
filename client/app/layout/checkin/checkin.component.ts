import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { GuestService } from '../../services/guest.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardLogin } from 'client/app/services/auth-guard-login.service';


@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html'
})
export class CheckinComponent implements OnInit {


  @Input('loginElement') loginElement: HTMLElement;
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
  roomNum = 1;
  activeGuest = true;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private modalService: NgbModal,
              public toast: ToastComponent,
              private guestService: GuestService,
              private auth: AuthService) { }

  ngOnInit() {
    this.checkinForm = this.formBuilder.group({
      userId: this.userId,
      hotelName: this.hotelName,
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate,
      roomNum: this.roomNum,
      activeGuest: this.activeGuest
    });
  }

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
    this.guestService.checkin(this.checkinForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully checked-in!', 'success');
        this.modalService.dismissAll('');
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }
}