import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
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
export class ProductListComponent implements OnInit, OnDestroy {

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
    field: 'note',
    title: 'Notes',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'noOfConfigs',
    title: 'No Of Configs',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'producedStock',
    title: 'Produced Stock',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'soldStock',
    title: 'Sold Stock',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'balanceStock',
    title: 'Balance Stock',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'actualSales',
    title: 'Actual Sales',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'createdAt',
    title: 'Created At',
    filterBy: 'calendar',
    type: 'date',
    active: true
  },
  {
    field: 'deletedAt',
    title: 'Deleted At',
    filterBy: 'calendar',
    type: 'date',
    active: false
  },
  {
    field: 'isActive',
    title: 'Is Active?',
    filterBy: 'input',
    type: 'string',
    active: false
  }]

  actions = [{
    type: 'producedStocks',
    label: 'Add Prodcuced Stocks',
    icon: 'pi pi-plus',
    isView: true
  }, {
    type: 'edit',
    label: 'Edit',
    icon: 'pi pi-pencil',
    isView: true
  }, {
    type: 'delete',
    label: 'Delete',
    icon: 'pi pi-trash',
    isView: true
  }];

  loading: boolean = false;
  isRowGroup: boolean = false;

  display: boolean = false;
  producedStock = 0;
  selectedItem: any;

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
        this.router.navigateByUrl(`product/edit/${data.id}`);
        break;

      case 'delete':
        this.delete(data);
        break;

      case 'producedStocks':
        this.addProducedStocks(data);
        break;

      default:
        break;
    }
  }

  addProducedStocks(data: any): void {
    this.selectedItem = data;
    this.display = true;
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

  addProducedStock(): void {
    const url = `${URLS.PRODUCT.SINGLE}/${this.selectedItem.id}/updateProducedStocks`;
    this.http.put(url, { quantity: this.producedStock }).subscribe((res: any) => {
      console.log(res);
      this.getProducts();
      this.display = false;
    })
  }

  ngOnDestroy(): void {
    this.selectedItem = {};
    this.producedStock = 0;
  }

}
