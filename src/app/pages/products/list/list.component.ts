import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/http.service';
import { URLS } from 'src/app/shared/constants/urls';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProductListComponent implements OnInit {

  breadcrumb: MenuItem[] = [
    { label: 'Product' },
    { label: 'List' },
  ];

  data: any[];
  dataKey = 'id';
  columns = [{
    field: 'code',
    title: 'Code',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'name',
    title: 'Name',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'description',
    title: 'Description',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'quantity',
    title: 'Quantity',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'isActive',
    title: 'Is Active?',
    filterBy: 'input',
    type: 'string',
    active: false
  }]

  actions = [{
    type: 'delete',
    label: 'Delete User',
    icon: 'pi pi-trash',
    isView: true
  }];

  loading: boolean = false;
  isRowGroup: boolean = false;


  display: boolean = false;
  emailForm: FormGroup;

  constructor(
    public helper: HelperService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get(`${URLS.PRODUCT.LIST}`).subscribe((products: any) => {
      this.data = products.data;
    })
  }

  actionEmitter(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.router.navigateByUrl(`customer/edit/${data.id}`);
        break;

      case 'delete':
        this.delete(data);
        break;

      default:
        break;
    }
  }


  delete(data: any): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const url = `${URLS.PRODUCT.SINGLE}/${data.id}`;
        this.http.delete(url).subscribe((res) => {
          this.messageService.add({
            severity: 'success', summary: 'Deleted', detail: `${data.name} deleted successfully!`
          });
          this.getProducts();
        });
      }
    });
  }

}
