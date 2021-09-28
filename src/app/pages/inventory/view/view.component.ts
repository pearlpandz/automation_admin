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
  isAgent = Number(sessionStorage.getItem('qa_role')) == 3 ? true : false;;
  display = false;

  configurations = [{
    "switchType": "SWITCH",
    "switchNo": "1",
    "connectedWith": "Fan"
  }, {
    "switchType": "PORT",
    "switchNo": "2",
    "connectedWith": "TYPE C"
  }];

  customers = [];
  transaction: FormGroup;
  isProgress: boolean = false;
  isCompleted: boolean = false;

  constructor(
    private http: HttpClient,
    public _location: Location,
    private activateRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.getInfoById(this.id);
      }
    });

    this.getCustomerList();

    this.transaction = new FormGroup({
      customerId: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      deliveryAddress: new FormControl('', Validators.required),
      contactNo: new FormControl('', Validators.required),
    })
  }

  getInfoById(id): void {
    this.http.get(`${URLS.INVENTORY.SINGLE}/${id}`).subscribe((res: any) => {
      this.data = res.data;
    });
  }

  getCustomerList(): void {
    this.http.get(URLS.USER.LIST).subscribe((data: any[]) => {
      this.customers = data.map(a => ({ label: a.name, value: a.id }))
    });
  }

  submit(): void {
    if (this.transaction.valid) {
      this.isProgress = true;
      const data = {
        inventoryId: this.data.inventoryId,
        productId: this.data.product.id,

        soldBy: Number(sessionStorage.getItem('qa_userid')),

        customerId: this.transaction.value.customerId,
        price: this.transaction.value.price,
        deliveryAddress: this.transaction.value.deliveryAddress,
        contactNo: this.transaction.value.contactNo,
      };

      this.http.post(URLS.TRANSACTION.SALE, data).subscribe((res: any) => {
        this.isProgress = false;
        this.isCompleted = true;
        this.display = false;
        this.messageService.add({ severity: 'info', summary: 'Product Sale', detail: 'Product sold successfully' });
        this.getInfoById(this.id);
      })

    }
  }

  install(): void {
    this.confirmationService.confirm({
      message: 'Did you successfully install the product in customer location?',
      header: 'Installation Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.http.put(`${URLS.TRANSACTION.INSTALLATION}/${this.data.inventoryId}`,
          { agentId: Number(sessionStorage.getItem('qa_userid')) }).subscribe(res => {
            this.messageService.add({ severity: 'info', summary: 'Product Installation', detail: 'Installation updated successfully' });
            this.getInfoById(this.id);
          })
      }
    });
  }

}
