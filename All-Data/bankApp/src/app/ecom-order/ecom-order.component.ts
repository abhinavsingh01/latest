import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-ecom-order',
  templateUrl: './ecom-order.component.html',
  styleUrls: ['./ecom-order.component.scss']
})
export class EcomOrderComponent implements OnInit {

  sub: any;
  status: string;
  orderId: string;
  order: any;
  products: any;
  tPrice: any;
  orderDate: string;

  constructor(private aRoute: ActivatedRoute, private api : ApiServiceService) { }

  ngOnInit() {
  	this.sub = this.aRoute.params.subscribe(params => {
       this.orderId = params['orderId'];
       this.status = params['status'];
       this.api.trackOrder(this.orderId).subscribe((data: any) => {
       this.order = data.order;
       this.products = data.order.cart.products;
       this.tPrice = data.order.cart.tPrice;
       let date = new Date(data.order.date);
       this.orderDate = date.getDate()+ "/"+(date.getMonth()+1) + '/'+date.getFullYear();
      })
    });
  }

}
