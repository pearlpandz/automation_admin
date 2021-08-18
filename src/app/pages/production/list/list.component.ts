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
  producedStock = 0;
  selectedItem: any;

  statusList: any[];
  selectedStatus;
  isRowSelect = false;

  agents = [];

  constructor(
    public helper: HelperService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getProductionHistory();
  }

  getProductionHistory(): void {
    this.http.get(`${URLS.PRODUCTION.LIST}`).subscribe((res: any) => {
      this.data = res.data;
    })
  }

  ngOnDestroy(): void {
    this.data = [];
  }

}
