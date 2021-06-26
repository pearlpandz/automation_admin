import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from 'src/app/shared/shared.module';
import { FranchiseListComponent } from './list/list.component';
import { FranchisesRoutingModule } from './franchises-routing.module';
import { FranchiseAddComponent } from './add/add.component';

@NgModule({
    declarations: [FranchiseListComponent, FranchiseAddComponent],
    imports: [
        CommonModule,
        FranchisesRoutingModule,
        CardModule,
        ButtonModule,
        SharedModule,
    ]
})
export class FranchisesModule { }
