import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/http.service';
import { URLS } from 'src/app/shared/constants/urls';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UserListComponent implements OnInit {

  breadcrumb: MenuItem[] = [
    { label: 'Users' },
    { label: 'List' },
  ];

  data: any[];
  dataKey = 'id';
  columns = [{
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
  },
  {
    field: 'lastLogin',
    title: 'Modified Date',
    filterBy: 'calendar',
    type: 'date',
    active: true
  }
  ]

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
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.commonService.getMethodWithAuth(`${URLS.USER.LIST}`).subscribe(users => {
      this.data = users;
    })

    this.emailForm = new FormGroup({
      to: new FormControl(''),
      subject: new FormControl(''),
      message: new FormControl(''),
      attachementXls: new FormControl(false),
      attachementCsv: new FormControl(false),
      isHtmlBody: new FormControl(false),
    });
  }

  sendEmail(event) {
    this.display = event.isSendEmail;
  }



}
