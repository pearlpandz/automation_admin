import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { URLS } from 'src/app/shared/constants/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BREADCRUMB_ADD } from '../constants';

@Component({
  selector: 'app-view-inventory-product',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class ViewInventoryProductComponent implements OnInit {
  breadcrumb = BREADCRUMB_ADD;
  id: any;
  data: any;

  constructor(
    private http: HttpClient,
    public _location: Location,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getInfoById(this.id);
      }
    })
  }

  getInfoById(id): void {
    this.http.get(`${URLS.INVENTORY.SINGLE}/${id}`).subscribe((res: any) => {
      this.data = res;
    });
  }

}
