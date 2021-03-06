import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { URLS } from 'src/app/shared/constants/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BREADCRUMB_ADD } from '../constants';

@Component({
  selector: 'app-add-manufacturer',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [MessageService]
})

export class ManufacturerAddComponent implements OnInit {
  breadcrumb = BREADCRUMB_ADD;

  roles: any[];
  userForm: FormGroup;
  isProgress: boolean = false;
  isCompleted: boolean = false;
  clients: any[];
  projects: any[];
  client_projects: any[];
  isShow = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    public _location: Location,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    })
  }

  submit(values: any): any {
    if (values) {
      this.isProgress = true;

      const _body = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        address: values.address
      }
      this.http.post(`${URLS.USER.ADD}`, _body).subscribe((res: any) => {
        this.isProgress = false;
        this.isCompleted = true;
        this.messageService.add({
          severity: 'success', summary: 'Success', detail: `${_body.name} created successfully!`
        });
        this.router.navigateByUrl('/customer/list');
      }, (error: HttpErrorResponse) => {
        this.isProgress = false;
        this.isCompleted = false;
      })
    }
  }
}
