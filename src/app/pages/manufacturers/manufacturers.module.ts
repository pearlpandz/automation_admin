import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from 'src/app/shared/shared.module';
import { ManufacturerListComponent } from './list/list.component';
import { ManufacturersRoutingModule } from './manufacturers-routing.module';
import { ManufacturerAddComponent } from './add/add.component';

@NgModule({
    declarations: [ManufacturerListComponent, ManufacturerAddComponent],
    imports: [
        CommonModule,
        ManufacturersRoutingModule,
        CardModule,
        ButtonModule,
        SharedModule,
    ]
})
export class ManufacturersModule { }
