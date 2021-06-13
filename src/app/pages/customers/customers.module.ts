import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './list/list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { UserAddComponent } from './add/add.component';

@NgModule({
    declarations: [UserListComponent, UserAddComponent],
    imports: [
        CommonModule,
        CustomersRoutingModule,
        CardModule,
        ButtonModule,
        SharedModule,
    ]
})
export class CustomersModule { }
