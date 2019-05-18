import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardGuest implements CanActivate {

  constructor(public auth: AuthService, private router: Router) {}

  canActivate() {

    if (!this.auth.isGuest) {
      this.router.navigate(['/']);
      return false;
    }

    return this.auth.isGuest;
  }

}
