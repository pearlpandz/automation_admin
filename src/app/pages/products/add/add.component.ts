import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { URLS } from 'src/app/shared/constants/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BREADCRUMB_ADD } from '../constants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [MessageService]
})

export class AddProductComponent implements OnInit {
  breadcrumb = BREADCRUMB_ADD;

  roles: any[];
  form: FormGroup;
  isProgress: boolean = false;
  isCompleted: boolean = false;
  clients: any[];
  projects: any[];
  client_projects: any[];
  isShow = false;
  id: any;
  configurations: FormArray;
  // isActive = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    public _location: Location,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      configurations: this.fb.array([])
    });

    this.addConfig();


    console.log(this.form.value);

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
      this.form.patchValue({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
      });
      // this.isActive = data.isActive == 1 ? true : false;
    });
  }

  get f() {
    return this.form.controls;
  }

  createConfig() {
    return this.fb.group({
      connectedWith: [''],
      switchNo: ['']
    })
  }

  addConfig() {
    this.configurations = this.form.get('configurations') as FormArray;
    this.configurations.push(this.createConfig());
  }

  submit(values: any): any {
    if (values) {
      this.isProgress = true;

      console.log(values);

      // const _body = {
      //   name: values.name,
      //   email: values.email,
      //   mobile: values.mobile,
      //   address: values.address,
      //   // isActive: this.isActive ? 1 : 0
      // }

      // if (this.id) {
      //   this.edit(_body);
      // } else {
      //   this.add(_body);
      // }
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
