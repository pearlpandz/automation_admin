import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewInventoryProductComponent } from './view/view.component';
import { InventoryProductListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: InventoryProductListComponent
    }, {
        path: 'view/:id',
        component: ViewInventoryProductComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryProductsRoutingModule { }
