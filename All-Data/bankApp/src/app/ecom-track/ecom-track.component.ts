import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecom-track',
  templateUrl: './ecom-track.component.html',
  styleUrls: ['./ecom-track.component.scss']
})
export class EcomTrackComponent implements OnInit {

  orderId : string;
  mobile : string;
  constructor(private api : ApiServiceService, private router: Router) { }

  ngOnInit() {
  	
  }

  track(){
  	this.router.navigate(['/ecom/checkout/order/'+this.orderId+"/track"]);
  }

}
