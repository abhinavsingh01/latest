import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { EcomCartComponent } from './ecom-cart/ecom-cart.component';
import { EcomDelAddressComponent } from './ecom-del-address/ecom-del-address.component';
import { EcomDelPaymentComponent } from './ecom-del-payment/ecom-del-payment.component';
import { EcomOrderComponent } from './ecom-order/ecom-order.component';
import { EcomTrackComponent } from './ecom-track/ecom-track.component';
import { LoginComponent } from './login/login.component';
import { BservicesComponent } from './bservices/bservices.component';
import { BillpaymentComponent } from './billpayment/billpayment.component';
import { ModalComponent } from './modal/modal.component';
import { LogoutComponent } from './logout/logout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent, MainComponent, LoginComponent, BservicesComponent, BillpaymentComponent, ModalComponent, LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
