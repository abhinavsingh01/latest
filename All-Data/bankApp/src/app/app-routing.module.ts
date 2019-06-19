import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { BservicesComponent } from './bservices/bservices.component';
import { BillpaymentComponent } from './billpayment/billpayment.component';
import { AuthService as AuthGuard } from './auth.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'bank/:type',
    component: BservicesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bill-payment',
    component: BillpaymentComponent,
    canActivate: [AuthGuard]
  },
  { path: 'ecom/:category', loadChildren: './ecom/ecom.module#EcomPageModule' },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
