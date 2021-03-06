import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { URLS } from 'src/app/shared/constants/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BREADCRUMB_ADD } from '../constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [MessageService]
})

export class UserAddComponent implements OnInit {
  breadcrumb = BREADCRUMB_ADD;

  roles: any[];
  userForm: FormGroup;
  isProgress: boolean = false;
  isCompleted: boolean = false;
  clients: any[];
  projects: any[];
  client_projects: any[];
  isShow = false;
  id: any;
  // isActive = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    public _location: Location,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    })

    // only edit
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id)
        this.getInfoById(this.id);
    })
  }

  getInfoById(id): void {
    this.http.get(`${URLS.USER.SINGLE}/${id}`).subscribe((res: any) => {
      const data = res.data;
      this.userForm.patchValue({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
      });
      // this.isActive = data.isActive == 1 ? true : false;
    });
  }

  get f() {
    return this.userForm.controls;
  }

  submit(values: any): any {
    if (values) {
      this.isProgress = true;

      const _body = {
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        address: values.address,
        // isActive: this.isActive ? 1 : 0
      }

      if (this.id) {
        this.edit(_body);
      } else {
        this.add(_body);
      }
    }
  }

  add(data): void {
    this.http.post(`${URLS.USER.ADD}`, data).subscribe((res: any) => {
      this.isProgress = false;
      this.isCompleted = true;
      this.messageService.add({
        severity: 'success', summary: 'Success', detail: `${data.name} created successfully!`
      });
      this.router.navigateByUrl('/customer/list');
    }, (error: HttpErrorResponse) => {
      this.isProgress = false;
      this.isCompleted = false;
    })
  }

  edit(data): void {
    this.http.put(`${URLS.USER.EDIT}/${this.id}`, data).subscribe((res: any) => {
      this.isProgress = false;
      this.isCompleted = true;
      this.messageService.add({
        severity: 'success', summary: 'Success', detail: `${data.name} updated successfully!`
      });
      this.router.navigateByUrl('/customer/list');
    }, (error: HttpErrorResponse) => {
      this.isProgress = false;
      this.isCompleted = false;
    })
  }

}
