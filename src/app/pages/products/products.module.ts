import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ProductListComponent } from './list/list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './add/add.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [ProductListComponent, AddProductComponent],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        CardModule,
        ButtonModule,
        SharedModule,
    ]
})
export class ProductsModule { }
