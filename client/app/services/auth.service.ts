import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { UserService } from './user.service';
import { User } from '../shared/models/user.model';
import { GuestService } from './guest.service';
import { Guest } from '../shared/models/guest.model';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  loggedIn = false;
  isAdmin = false;
  isGuest = false;

  currentUser: User = new User();
  currentGuest: Guest = new Guest();

  constructor(private userService: UserService,
              private guestService: GuestService,
              private router: Router,
              private jwtHelper: JwtHelperService) {
    this.getUserOnStart();
  }

  async getUserOnStart () {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      const user = await this.userService.getUser(decodedUser);
      this.setCurrentUser(user);
    }
  }

  login(emailAndPassword) {
    return this.userService.login(emailAndPassword).map(
      res => {
        localStorage.setItem('token', res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.isGuest = false;
    this.currentUser = new User();
    this.currentGuest = new Guest();
    this.router.navigate(['/']);
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    delete decodedUser.role;
    this.setCurrentGuest();
  }

  setCurrentGuest() {
    this.guestService.getActiveGuest(this.currentUser._id).subscribe((guest) => {
      const activeGuest = guest;
      if (activeGuest) {
        this.currentGuest = guest;
        this.isGuest = true;
      }
    }, (err) => {
      console.log(err);
    });
  }

  checkIn() {
    this.setCurrentGuest();
    this.router.navigate(['/']);
  }

  checkout() {
    this.isGuest = false;
    this.currentGuest = new Guest();
    this.router.navigate(['/']);
  }

}
