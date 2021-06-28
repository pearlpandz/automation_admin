import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';


import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AuthGuardService as AuthGuard } from '../shared/guards/auth-guard.service';

import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  declarations: [LoginComponent, VerifyComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    SharedModule,
  ],
  providers: [
    AuthGuard
  ]
})
export class PagesModule { }
