import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatatableComponent } from './components/datatable/datatable.component';
import { HeaderComponent } from '../components/header/header.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { EditorModule } from 'primeng/editor';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MegaMenuModule } from 'primeng/megamenu';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PickListModule } from 'primeng/picklist';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { TreeModule } from 'primeng/tree';
import { ListboxModule } from 'primeng/listbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BlockUIModule } from 'primeng/blockui';
import { SplitButtonModule } from 'primeng/splitbutton';

import { StringToDatePipe } from './pipes/date.pipes';
import { AddPercentagePipe } from './pipes/percentage.pipe';

import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { SanitizeHtmlPipe } from './pipes/sanitizeHtml.pipe';

import { HelperService } from './services/helper.service';

@NgModule({
  declarations: [
    DatatableComponent,
    StringToDatePipe,
    AddPercentagePipe,
    HeaderComponent,
    BreadcrumbComponent,
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    CheckboxModule,
    RadioButtonModule,
    MegaMenuModule,
    BreadcrumbModule,
    InputSwitchModule,
    PickListModule,
    CardModule,
    TabViewModule,
    DataViewModule,
    TreeModule,
    ListboxModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    BlockUIModule,
    SplitButtonModule
  ],
  exports: [
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DatatableComponent,
    TableModule,
    TooltipModule,
    StringToDatePipe,
    SelectButtonModule,
    AddPercentagePipe,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    CheckboxModule,
    RadioButtonModule,
    InputSwitchModule,
    HeaderComponent,
    MegaMenuModule,
    BreadcrumbComponent,
    BreadcrumbModule,
    PickListModule,
    CardModule,
    TabViewModule,
    SanitizeHtmlPipe,
    DataViewModule,
    TreeModule,
    ListboxModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    BlockUIModule,
    SplitButtonModule
  ],
  providers: [
    HelperService
  ]
})
export class SharedModule { }
