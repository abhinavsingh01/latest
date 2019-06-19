import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-ecom-cart',
  templateUrl: './ecom-cart.component.html',
  styleUrls: ['./ecom-cart.component.scss']
})
export class EcomCartComponent implements OnInit {

  cart : any = {};
  products : any = [];
  isCartEmpty: boolean;
  constructor(private api : ApiServiceService) { }

  ngOnInit() {
  	this.cart = this.api.getCart();
  	this.products = this.cart.products;
    if(this.api.getCartCount() == 0){
      this.isCartEmpty = true;
    }else{
      this.isCartEmpty = false;
    }
  }

  deleteCart(pId){
  	this.products = this.api.deleteCart(pId);
  }

}
