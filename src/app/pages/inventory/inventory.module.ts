import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { InventoryProductListComponent } from './list/list.component';
import { InventoryProductsRoutingModule } from './inventory-routing.module';
import { ViewInventoryProductComponent } from './view/view.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [InventoryProductListComponent, ViewInventoryProductComponent],
    imports: [
        CommonModule,
        InventoryProductsRoutingModule,
        CardModule,
        ButtonModule,
        SharedModule,
    ]
})
export class InventoryProductsModule { }
