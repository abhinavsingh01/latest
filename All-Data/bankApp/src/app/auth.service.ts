import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate  {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(sessionStorage['token'] == undefined){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
