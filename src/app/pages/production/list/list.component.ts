import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { URLS } from 'src/app/shared/constants/urls';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProductionListComponent implements OnInit, OnDestroy {

  breadcrumb: MenuItem[] = [
    { label: 'Production' },
    { label: 'List' },
  ];

  data: any[];
  dataKey = 'inventoryId';

  columns = [{
    field: 'id',
    title: 'Production Id',
    filterBy: 'input',
    type: 'string',
    active: false
  }, {
    field: 'productId',
    title: 'Product Id',
    filterBy: 'input',
    type: 'string',
    active: false
  }, {
    field: 'productCode',
    title: 'Product Code',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'productName',
    title: 'Product Name',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'producedStocks',
    title: 'Produced Stocks',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'productionAt',
    title: 'Added Into Production',
    filterBy: 'calendar',
    type: 'date',
    active: true
  }]

  loading: boolean = false;
  isRowGroup: boolean = false;

  display: boolean = false;
  producedStock;
  productId;
  selectedItem: any;

  statusList: any[];
  selectedStatus;
  isRowSelect = false;

  products;

  constructor(
    public helper: HelperService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getProductionHistory();
    this.getProducts();
  }

  getProductionHistory(): void {
    this.http.get(`${URLS.PRODUCTION.LIST}`).subscribe((res: any) => {
      this.data = res.data;
    })
  }

  getProducts(): void {
    this.products = [];
    this.http.get(`${URLS.PRODUCT.LIST}`).subscribe((products: any) => {
      this.products = products.data?.map(a => ({
        label: `${a.name} (${a.code})`,
        value: a.id
      }));
    })
  }

  addProducedStocks(isOpen: boolean): void {
    this.display = isOpen;
  }

  addProducedStock(): void {
    const url = `${URLS.INVENTORY.SINGLE}`;
    this.http.post(url, { productId: this.productId, count: this.producedStock }).subscribe((res: any) => {
      this.getProductionHistory();
      this.display = false;
    })
  }

  ngOnDestroy(): void {
    this.data = [];
    this.producedStock = 0;
  }

}
