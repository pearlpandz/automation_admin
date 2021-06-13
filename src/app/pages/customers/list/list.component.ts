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
  dataKey = 'userId';
  columns = [
    {
      field: 'firstName',
      title: 'First Name',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'lastName',
      title: 'Last Name',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'userName',
      title: 'Username',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'displayName',
      title: 'Display Name',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'operator',
      title: 'Operator',
      filterBy: 'input',
      type: 'string',
      active: false
    },
    {
      field: 'email',
      title: 'Email',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'role',
      title: 'User Type',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'group',
      title: 'Group',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'isVerify',
      title: 'is Verified?',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'isLockedOut',
      title: 'is Locked?',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'lastPasswordReset',
      title: 'Last Password Reset',
      filterBy: 'calendar',
      type: 'date',
      active: true
    },
    {
      field: 'active',
      title: 'Is Active?',
      filterBy: 'input',
      type: 'string',
      active: true
    },
    {
      field: 'createdDate',
      title: 'Created Date',
      filterBy: 'calendar',
      type: 'date',
      active: true
    },
    {
      field: 'modifiedDate',
      title: 'Modified Date',
      filterBy: 'calendar',
      type: 'date',
      active: true
    }
  ]
  loading: boolean = false;
  isRowGroup: boolean = false;


  display: boolean = false;
  emailForm: FormGroup;

  constructor(
    public helper: HelperService,
    private commonService: CommonService) { }

  ngOnInit(): void {

    this.commonService.getMethodWithAuth(`${URLS.USER.LIST}`).subscribe(users => {
      this.data = users.userResultSet;
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
