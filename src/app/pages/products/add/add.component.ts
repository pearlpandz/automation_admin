import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { URLS } from 'src/app/shared/constants/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { BREADCRUMB_ADD } from '../constants';

@Component({
  selector: 'app-add-product',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [MessageService, ConfirmationService]
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
  baseDevices: any;
  switchTypes: any[];
  // isActive = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    public _location: Location,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      configurations: this.fb.array([])
    });

    this.getSwitchTypes();
    this.getBaseDevices();

    // only edit
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getInfoById(this.id);
      } else {
        this.addConfig();
      }
    })
  }

  getSwitchTypes(): void {
    this.http.get(URLS.OTHERS.SWITCH_TYPES).subscribe((res: any) => {
      this.switchTypes = res?.data
    })
  }

  getBaseDevices(): void {
    this.http.get(URLS.OTHERS.BASE_DEVICES).subscribe((res: any) => {
      this.baseDevices = res?.data?.map(device => ({ label: device.name, value: device.id }))
    })
  }

  getInfoById(id): void {
    this.http.get(`${URLS.PRODUCT.SINGLE}/${id}`).subscribe((res: any) => {
      const data = res.data;
      this.form.patchValue({
        name: data.name,
        description: data.description,
        note: data.note
      });
      if (data.noOfConfigs > 0) {
        for (let i = 0; i < data.noOfConfigs; i++) {
          this.addConfig(data.configurations[i]);
        }
      }
    });
  }

  removeItem(i) {
    this.configurations.removeAt(i);
    console.log(this.configurations);
  }

  get f() {
    return this.form.controls;
  }

  createConfig(data?: any) {
    return this.fb.group({
      connectedWith: [data?.connectedWith],
      switchNo: [data?.switchNo],
      switchType: [data?.switchType]
    })
  }

  addConfig(data?: any) {
    this.configurations = this.form.get('configurations') as FormArray;
    this.configurations.push(this.createConfig(data));
  }

  submit(values: any): any {
    if (values) {
      this.confirmationService.confirm({
        message: `Are you sure that you want to ${this.id ? 'update' : 'save'}?`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.isProgress = true;
          if (this.id) {
            this.edit(values);
          } else {
            this.add(values);
          }
        }
      });
    }
  }

  add(data): void {
    this.http.post(`${URLS.PRODUCT.SINGLE}`, data).subscribe((res: any) => {
      this.isProgress = false;
      this.isCompleted = true;
      this.messageService.add({
        severity: 'success', summary: 'Success', detail: `${data.name} created successfully!`
      });
      setTimeout(() => {
        this._location.back();
      }, 2000);
    }, (error: HttpErrorResponse) => {
      this.isProgress = false;
      this.isCompleted = false;
    })
  }

  edit(data): void {
    this.http.put(`${URLS.PRODUCT.SINGLE}/${this.id}`, data).subscribe((res: any) => {
      this.isProgress = false;
      this.isCompleted = true;
      this.messageService.add({
        severity: 'success', summary: 'Success', detail: `${data.name} updated successfully!`
      });
      setTimeout(() => {
        this._location.back();
      }, 2000);
    }, (error: HttpErrorResponse) => {
      this.isProgress = false;
      this.isCompleted = false;
    })
  }

}
