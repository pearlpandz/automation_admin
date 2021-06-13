import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';

import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    public messageService: MessageService,
    public location: Location
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (this.auth.isAuthenticated()) {
      return true;
    }

    // if token not valid
    this.router.navigate(['/']);
    return false;
  }
}
