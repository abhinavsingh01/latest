import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url: string;
  constructor(private http: HttpClient) {
  this.url = environment.SERVER_URL; }

  isUserLogin(){
    if(sessionStorage["user"] != "undefined"){
      return true;
    }
    return false;
  }

  userAuthenticate(aadharNum, otp){
    //let data = JSON.stringify({aadharNum : aadharNum, otp : otp});
    let data = {aadharNum : aadharNum, otp : otp};
    return this.http.post(this.url+"/login", data);
  }

  createSession(aadharNum, user, accounts, token, id, pList){
    sessionStorage['user'] = JSON.stringify({aadharNum : aadharNum, name : user.name, age : user.age, mobile : user.mobile});
    sessionStorage['token'] = token;
    sessionStorage['id'] = id;
    sessionStorage['pList'] = JSON.stringify(pList);
    sessionStorage['accDetails'] = JSON.stringify({});
    sessionStorage['accounts'] = JSON.stringify(accounts);
  }



  getUserAadhar(){
    let user = JSON.parse(sessionStorage['user']);
    let aadharNum = user.aadharNum;
    return aadharNum;
  }

  getAccList(type){
    let accounts = JSON.parse(sessionStorage['accounts']);
    console.log(accounts);
    let list = [];
    for(let i=0;i<accounts.length;i++){
      if(accounts[i].accType == type){
        list.push(accounts[i]);
      }
    }
    return list;
  }

  storeAccountDetails(accNum, accountDetails){
    let accDetails = JSON.parse(sessionStorage['accDetails']);
    if(accDetails[accNum] == undefined){
      accDetails[accNum] = accountDetails;
      sessionStorage['accDetails'] = JSON.stringify(accDetails);
    }
  }

  updateAccount(accNum, balance){
    let accDetails = JSON.parse(sessionStorage['accDetails']);
    accDetails[accNum]['balance'] = ""+balance;
    sessionStorage['accDetails'] = JSON.stringify(accDetails);
  }

  getAccountDetails(accNum){
     let accDetails = JSON.parse(sessionStorage['accDetails']);
     return accDetails[accNum];
  }
}
