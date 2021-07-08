import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService as AuthGuard } from '../shared/guards/auth-guard.service';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agent',
    loadChildren: () => import('./franchises/franchises.module').then(m => m.FranchisesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'manufacturer',
    loadChildren: () => import('./manufacturers/manufacturers.module').then(m => m.ManufacturersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
