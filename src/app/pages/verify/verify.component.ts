import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLS } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  isVerify = false;

  constructor(
    private http: HttpClient,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.http.post(URLS.TOKEN, { token: params.auth_token }).subscribe(data => {
        console.log(data);
        this.isVerify = true;
      })
    })
  }

}
