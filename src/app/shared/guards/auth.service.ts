import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { CommonService } from '../services/http.service';

@Injectable()
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private messageService: MessageService,
    private commonService: CommonService,
    private route: Router
  ) { }

  // Token and Permission checking when the user switch one page to another page 
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('qa_token');
    // if token available, need to check whether the token expired or not! Else it will send FALSE (Authentication Failed)
    if (token) {
      // if token expired, it will redirect to login page. Else it will move to targetted page
      if (this.jwtHelper.isTokenExpired(token)) {
        return false;
      }
      return true;
    }
    return false;
  }

  getAuthorizationHeader() {
    return 'Bearer ' + sessionStorage.getItem('qa_token');
  }

  logout() {
    sessionStorage.clear();
    this.route.navigateByUrl('/');
  }

}
