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
export class InventoryProductListComponent implements OnInit, OnDestroy {

  breadcrumb: MenuItem[] = [
    { label: 'Inventory' },
    { label: 'List' },
  ];

  data: any[];
  dataKey = 'inventoryId';

  columns = [{
    field: 'inventoryKey',
    title: 'Inventory Key',
    filterBy: 'input',
    type: 'string',
    active: true
  },

  {
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
    field: 'noOfConfigs',
    title: 'No Of Configs',
    filterBy: 'input',
    type: 'string',
    active: false
  }, {
    field: 'producedAt',
    title: 'Added At Inventory',
    filterBy: 'calendar',
    type: 'date',
    active: true
  },


  // {
  //   field: 'agentId',
  //   title: 'Agent Id',
  //   filterBy: 'input',
  //   type: 'string',
  //   active: false
  // },
  {
    field: 'agentName',
    title: 'Agent Name',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'soldStatus',
    title: 'Status',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'soldAt',
    title: 'Sold At',
    filterBy: 'calendar',
    type: 'date',
    active: true
  },


  {
    field: 'actualSoldAt',
    title: 'Actual Sold At',
    filterBy: 'calendar',
    type: 'date',
    active: false
  },


  // {
  //   field: 'customerId',
  //   title: 'Customer Id',
  //   filterBy: 'input',
  //   type: 'string',
  //   active: false
  // }, 
  {
    field: 'customerName',
    title: 'Customer Name',
    filterBy: 'input',
    type: 'string',
    active: false
  },

  {
    field: 'installationAt',
    title: 'Installation At',
    filterBy: 'calendar',
    type: 'date',
    active: false
  },
  // {
  //   field: 'installedBy',
  //   title: 'installed By',
  //   filterBy: 'input',
  //   type: 'string',
  //   active: false
  // },
  {
    field: 'installedByName',
    title: 'Installed By',
    filterBy: 'input',
    type: 'string',
    active: false
  },

  {
    field: 'remarks',
    title: 'Remarks',
    filterBy: 'input',
    type: 'string',
    active: false
  }, {
    field: 'isActive',
    title: 'Is Active?',
    filterBy: 'input',
    type: 'string',
    active: false
  },

  ]

  actions = [
    //   {
    //   type: 'view',
    //   label: 'View Product',
    //   icon: 'pi pi-eye',
    //   isView: true
    // },
    // {
    //   type: 'report',
    //   label: 'Report Product',
    //   icon: 'pi pi-eye',
    //   isView: true
    // }
  ];

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
    this.getAgents();

    if (Number(sessionStorage.getItem('qa_role')) == 3) {
      // For Agent
      this.statusList = [
        { label: 'All', value: 'all' },
        { label: 'Assigned', value: 'available' },
        { label: 'Sold', value: 'sold' }
      ]
      this.selectedStatus = this.statusList[0].value;
      this.getProducts();
    } else {
      // For Admin and Manufacturer
      this.statusList = [
        { label: 'All', value: 'all' },
        { label: 'Un Assigned', value: 'new' },
        { label: 'Assigned', value: 'available' },
        { label: 'Sold', value: 'sold' }
      ];
      this.selectedStatus = this.statusList[0].value;
      this.getProducts();
    }
  }

  getAgents(): void {
    this.agents = [];
    this.http.get(`${URLS.ADMIN.LIST}/3`).subscribe((res: any) => {
      this.agents = res;
    })
  }

  getProducts(): void {
    let url = '';
    let data = {};
    if (Number(sessionStorage.getItem('qa_role')) == 3) {
      url = URLS.INVENTORY.LIST_AGENT;
      data = {
        agentId: Number(sessionStorage.getItem('qa_userid')),
        status: this.selectedStatus
      }
    } else {
      url = URLS.INVENTORY.LIST_ADMIN;
      data = {
        status: this.selectedStatus
      }
    }

    this.http.post(`${url}`, data).subscribe((products: any) => {
      this.data = products.data;
    })
  }

  actionEmitter(action: string, data: any) {
    switch (action) {
      case 'view':
        this.router.navigateByUrl(`inventory/view/${data.inventoryId}`);
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

  statusEmitter(status) {
    if (status == 'new') {
      this.isRowSelect = true;
    } else {
      this.isRowSelect = false;
    }
    this.selectedStatus = status;
    this.getProducts();

  }

  transferProduct(agentId: number, inventoryProductIds: any[]): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to transfer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const _body = { agentId, inventoryProductIds };
        this.http.put(URLS.INVENTORY.MOVE_PRODUCT_TO_AGENT, _body).subscribe((res: any) => {
          this.messageService.add({
            severity: 'success', summary: 'Product Transfer', detail: `Products transfered successfully!`
          });
          setTimeout(() => {
            this.getProducts();
          }, 1000);
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedItem = {};
    this.producedStock = 0;
  }

}
