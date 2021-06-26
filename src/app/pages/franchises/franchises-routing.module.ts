import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseAddComponent } from './add/add.component';
import { FranchiseListComponent } from './list/list.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: FranchiseListComponent
    }, {
        path: 'add',
        component: FranchiseAddComponent
    }, {
        path: 'edit/:id',
        component: FranchiseAddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FranchisesRoutingModule { }
