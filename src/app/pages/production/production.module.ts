import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ProductionListComponent } from './list/list.component';
import { ProductionRoutingModule } from './production-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [ProductionListComponent],
    imports: [
        CommonModule,
        ProductionRoutingModule,
        CardModule,
        ButtonModule,
        SharedModule,
    ]
})
export class ProductionModule { }
