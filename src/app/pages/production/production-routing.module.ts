import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductionListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: ProductionListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductionRoutingModule { }
