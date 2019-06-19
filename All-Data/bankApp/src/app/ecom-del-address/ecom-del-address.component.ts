import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecom-del-address',
  templateUrl: './ecom-del-address.component.html',
  styleUrls: ['./ecom-del-address.component.scss']
})
export class EcomDelAddressComponent implements OnInit {

  isNewAddress : boolean = false;
  highlight : boolean[] = [];
  addresses : any = {};

  name : String;
  mobile : String;
  address1 : String;
  address2 : String;
  city : String;
  state : String;
  pincode : String;

  constructor(private api : ApiServiceService, private router: Router) { }

  ngOnInit() {
    this.api.getAddress().subscribe((data: any) => {this.addresses = data.addresses});
  }

  cardClick(ev, addressId){
  	for(let i=0;i<this.highlight.length;i++){
  		this.highlight[i] = false;
  	}
  	this.highlight[0] = true;
    this.router.navigate(['/ecom/checkout/delivery/payment']);
  }

  newAddress(){
    for(let i=0;i<this.highlight.length;i++){
      this.highlight[i] = false;
    }
    this.isNewAddress = true;
  }

  saveNewAddress(){
    
    var nAddressObj = {
      name : this.name,
      mobile : this.mobile,
      address1 : this.address1,
      address2 : this.address2,
      city : this.city,
      state : this.state,
      pincode : this.pincode
    }
    this.api.saveAddress(nAddressObj).subscribe((data: any) => {
      let addressId = data.addressId;
      sessionStorage["addressId"] = addressId;
      this.router.navigate(['/ecom/checkout/delivery/payment']);
    });
  }
}
