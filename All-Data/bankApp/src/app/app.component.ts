import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bankApp';

  constructor(){
  	if(sessionStorage["cart"] == undefined){
  		sessionStorage["cart"] = JSON.stringify({tPrice : 0, products : []});
  	}
  }
}
