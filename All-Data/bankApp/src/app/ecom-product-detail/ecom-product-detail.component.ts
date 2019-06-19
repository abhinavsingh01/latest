import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-ecom-product-detail',
  templateUrl: './ecom-product-detail.component.html',
  styleUrls: ['./ecom-product-detail.component.scss'],
})
export class EcomProductDetailComponent implements OnInit {

  items: any;
  rating: number;
  rId: string;
  productDetails : any = {};
  ratingClicked: number;
  itemIdRatingClicked: string;
  sub: any;
  categoryId: string;
  subCategoryId: string;
  productId: string;
  ratingNum: number;

  constructor(private api : ApiServiceService, private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.ratingNum = 2;
    this.sub = this.aRoute.params.subscribe(params => {
       this.subCategoryId = params['cId']; 
       this.categoryId = params['category']; 
       this.productId = params['pId']; 
    });
    this.items = [];
    this.rating = 0;
    this.rId = "i1";
  	this.api.getProductDetail(this.subCategoryId, this.productId).subscribe((data: any) => {
  		data.productDetails.dPrice = data.productDetails.dPrice;
      this.productDetails = data.productDetails;
  	});
  }

  buyProduct(){
    this.api.saveCart(this.productDetails);
    this.router.navigate(['/ecom/checkout/cart']);
  }

  ratingComponentClick(clickObj: any): void {
    let rating = clickObj.rating;
    let pId = clickObj.id;
    this.api.updateRating(pId, rating).then(function(data){
      console.log(data);
    })
    console.log(clickObj);
    const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.company;
    }

  }

  back(){
    this.router.navigate(['/ecom/'+this.categoryId]);
  }

}
