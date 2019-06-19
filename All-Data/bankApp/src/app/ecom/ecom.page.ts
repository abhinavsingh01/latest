import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ecom',
  templateUrl: './ecom.page.html',
  styleUrls: ['./ecom.page.scss'],
})
export class EcomPage implements OnInit {

  category : any = {};
  sub: any;
  categoryId: string;

  constructor(private api : ApiServiceService, private aRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.aRoute.params.subscribe(params => {
       this.categoryId = params['category']; 
    });
    let subCategories = [];
  	
    this.api.getSubCategories(this.categoryId).subscribe((data: any) => {
      this.category = {"name" : data.name, bannerUrl : data.bannerUrl, subCategories : data.subCategories};
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back(){
    this.router.navigate(['/main'])
  }

}
