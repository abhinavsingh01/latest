import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ecom-product',
  templateUrl: './ecom-product.component.html',
  styleUrls: ['./ecom-product.component.scss'],
})
export class EcomProductComponent implements OnInit {

  products : any ;
  sub: any;
  subCategoryId: string;
  categoryId: string;

  constructor(private api : ApiServiceService, private aRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.products = {};
    this.sub = this.aRoute.params.subscribe(params => {
       this.subCategoryId = params['cId']; 
       this.categoryId = params['category']; 
    });
    let productList = [];
      this.api.getProducts(this.subCategoryId).subscribe((data: any) => {productList = data.data.productList;
      this.products = {catName : this.categoryId, productList : productList};
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  back(){
    this.router.navigate(['/ecom/'+this.categoryId]);
  }
}
