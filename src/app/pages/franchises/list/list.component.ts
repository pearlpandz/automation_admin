import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/http.service';
import { URLS } from 'src/app/shared/constants/urls';
import { HelperService } from 'src/app/shared/services/helper.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-franchise',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class FranchiseListComponent implements OnInit {

  breadcrumb: MenuItem[] = [
    { label: 'Agents' },
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
  }, {
    field: 'address',
    title: 'Address',
    filterBy: 'input',
    type: 'string',
    active: false
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
    active: true
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

  constructor(
    public helper: HelperService,
    private commonService: CommonService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public messageService: MessageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins(): void {
    this.commonService.getMethodWithAuth(`${URLS.ADMIN.LIST}/3`).subscribe(res => {
      this.data = res;
    })
  }

  actionEmitter(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.router.navigateByUrl(`agent/edit/${data.id}`);
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
        const url = `${URLS.ADMIN.SINGLE}/${data.id}`;
        this.http.delete(url).subscribe((res) => {
          this.messageService.add({
            severity: 'success', summary: 'Deleted', detail: `${data.userName} deleted successfully!`
          });
          this.getAllAdmins();
        });
      }
    });
  }



}
