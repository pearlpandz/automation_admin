import { Component, Input, OnInit, ViewChild, Inject, OnChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Table } from 'primeng/table';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() module: string;
  @Input() routePath: string;
  @Input() isAdd: boolean;

  @Input() data: any[];
  @Input() dataKey: string;

  @Input() columns: any[];
  @Input() actions: any[];
  selectedColumns: any[];
  selectedRow: any[] = [];

  @Input() loading: boolean;

  @Input() isEmail: boolean;
  @Output() sendEmail: EventEmitter<any> = new EventEmitter();



  @Input() isRowSelect: boolean;
  @Input() isRowExpand: boolean;
  @Input() isShowGlobalFilter: boolean;
  @Input() isExport: boolean;
  @Input() isShowDisplaySettings: boolean;
  @Input() isRowGroup: boolean = false;
  @Input() isRowAction: boolean;

  @Input() isPopup: boolean;
  @Output() isPopupEmitter: EventEmitter<any> = new EventEmitter();

  @Output() reportDetails: EventEmitter<any> = new EventEmitter();
  @Output() actionEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('dt') table: Table;

  @Input() isColumnFilter: boolean;

  // @Input() groupByFieldName:string;
  groupByFieldName = 'fiscalMonth';
  rowGroupMetadata: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.selectedColumns = this.columns.filter(column => column.active);

  }

  ngOnChanges() {
    this.updateRowGroupMetaData();
  }


  onSort() {
    this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    // debugger;

    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        let rowData = this.data[i];
        let groupFieldname = rowData[this.groupByFieldName];

        if (i == 0) {
          this.rowGroupMetadata[groupFieldname] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.data[i - 1];
          let previousRowGroup = previousRowData[this.groupByFieldName];
          if (groupFieldname === previousRowGroup)
            this.rowGroupMetadata[groupFieldname].size++;
          else
            this.rowGroupMetadata[groupFieldname] = { index: i, size: 1 };
        }
      }
    }
  }

  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  onDateSelect(value) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onRepresentativeChange(event) {
    this.table.filter(event.value, 'representative', 'in')
  }

  email() {
    this.sendEmail.emit({ isSendEmail: true })
  }

  route(path) {
    this.router.navigateByUrl(path);
  }

  openPopup() {
    this.isPopupEmitter.emit(true)
  }

  // dynamic row actions common method
  rowAction(actionName: String, rowData: any): void {
    this.actionEmitter.emit({ action: actionName, data: rowData });
  }

  reportInfo(rowData): void {
    this.reportDetails.emit(rowData);
  }

}
