import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/http.service';
import { URLS } from 'src/app/shared/constants/urls';
import { HelperService } from 'src/app/shared/services/helper.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserListComponent implements OnInit {

  breadcrumb: MenuItem[] = [
    { label: 'Customers' },
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
    field: 'email',
    title: 'Email',
    filterBy: 'input',
    type: 'string',
    active: true
  }, {
    field: 'mobile',
    title: 'Mobile',
    filterBy: 'input',
    type: 'string',
    active: true
  },
  {
    field: 'isActive',
    title: 'Is Verified?',
    filterBy: 'input',
    type: 'boolean',
    active: true
  },
  {
    field: 'createdAt',
    title: 'Created Date',
    filterBy: 'calendar',
    type: 'date',
    active: false
  },
  {
    field: 'lastLogin',
    title: 'Modified Date',
    filterBy: 'calendar',
    type: 'date',
    active: false
  }]

  actions = [{
    type: 'edit',
    label: 'Edit User',
    icon: 'pi pi-pencil',
    isView: true
  }, {
    type: 'delete',
    label: 'Delete User',
    icon: 'pi pi-trash',
    isView: true
  }];
  loading: boolean = false;
  isRowGroup: boolean = false;


  display: boolean = false;
  emailForm: FormGroup;

  agents = [];

  constructor(
    public helper: HelperService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getAgents();
  }

  getCustomers(): void {
    this.loading = true;
    this.http.get(`${URLS.USER.LIST}`).subscribe((users: any) => {
      this.data = users;
      this.loading = false;
    })
  }

  getAgents(): void {
    this.agents = [];
    this.http.get(`${URLS.ADMIN.EXCEPT_AGENT_LIST}`).subscribe((res: any) => {
      this.agents = res;
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
        const url = `${URLS.USER.SINGLE}/${data.id}`;
        this.http.delete(url).subscribe((res) => {
          this.messageService.add({
            severity: 'success', summary: 'Deleted', detail: `${data.name} deleted successfully!`
          });
          this.getCustomers();
        });
      }
    });
  }

  transferCustomer(otherAgentId, customerIds): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to transfer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const _body = { otherAgentId, customerIds };
        this.http.post(URLS.USER.TRANSFER, _body).subscribe((res: any) => {
          this.messageService.add({
            severity: 'success', summary: 'Deleted', detail: `Customers transfered successfully!`
          });
          setTimeout(() => {
            this.getCustomers();
          }, 1000);
        })
      }
    })
  }

}
