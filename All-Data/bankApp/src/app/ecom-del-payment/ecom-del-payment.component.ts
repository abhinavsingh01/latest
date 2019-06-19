import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecom-del-payment',
  templateUrl: './ecom-del-payment.component.html',
  styleUrls: ['./ecom-del-payment.component.scss']
})
export class EcomDelPaymentComponent implements OnInit {

  payMode : String;
  isPayOnline: boolean;
  isPayCod: boolean;
  cart : any;
  products : any;
  constructor(private api : ApiServiceService, private router: Router) { }

  ngOnInit() {
    this.payMode = "";
    this.cart = this.api.getCart();
    this.products = this.cart.products;
  }

  selectPayMode(mode){
  	this.payMode = mode;
    if(mode == 'online'){
      this.isPayOnline = true;
      this.isPayCod = false;
    }else{
      this.isPayOnline = false;
      this.isPayCod = true;
    }
  }

  completeOrder(){
    if(this.payMode.length > 0){
  	this.api.completeOrder(this.payMode).subscribe((data: any) => {
      let orderId = data.orderId;
      if(data.msg == "success"){
        delete sessionStorage['cart'];
        this.router.navigate(['/ecom/checkout/order/'+orderId+'/complete'])
      }else{
        this.router.navigate(['/ecom/checkout/order/'+orderId+'/fail'])
      }
    });
  }else{
    alert('Select payment mode');
  }
  }
  

}
