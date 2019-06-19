import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { ModalserviceService } from '../modalservice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;
  isAadhar: boolean = false;
  isOtp: boolean = false;
  aadharNum: string = "";
  otp: string = "";
  isAadharInValid: boolean = false;
  isOtpInvalid: boolean = false;
  mHeading: string;
  mBody: string;

  constructor(private userService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalserviceService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if(sessionStorage.getItem("token") != undefined){
      this.router.navigate(['/main']);
    }
    if(this.userService.isUserLogin){
      this.isLogin = true;
    }
    this.mHeading = "Login Failed"
    this.mBody = "Please try again."
  };

  login(type){
    this.isLogin = false;
    this.isAadhar = true;
  }

  generateOtp(){
    var reg = /^\d+$/;
    if(reg.test(this.aadharNum)){
      this.isAadhar = false;
      this.isOtp = true;
      this.isAadharInValid = false;
    }else{
      this.isAadharInValid = true;
    }

  }

  authenticate(){
    var reg = /^\d+$/;
    if(reg.test(this.otp)){
      this.spinner.show();
      this.userService.userAuthenticate(this.aadharNum, this.otp).subscribe((data: any) => {
        this.spinner.hide();
        if(data.status == "Fail"){
          this.isAadharInValid = true;
          this.back("aadhar");
        }else if(data.status == "Success"){
          let user = {name : data.name, age: data.age, mobile: data.mobile};
          let accounts = data.accounts;
          let token = data.token;
          let id = data.id;
          let pList = data.personalList;
          this.userService.createSession(this.aadharNum, user, accounts, token, id, pList);
          this.router.navigate(['/main']);
        }
      },
    (err) => {console.log(err); this.spinner.hide();});
      this.isOtpInvalid = false;
    }else{
      this.isOtpInvalid = true;
    }

  }

  back(type){
    if(type == "login"){
      this.isLogin = true;
      this.isAadhar = false;
      this.isOtp = false;
      this.aadharNum = "";
      this.otp = "";
      this.isAadharInValid = false;
      this.isOtpInvalid = false;
    }else if(type == "aadhar"){
      this.isLogin = false;
      this.isAadhar = true;
      this.isOtp = false;
      this.otp = "";
      this.isOtpInvalid = false;
    }
  }

  openModal(id: string) {
        this.modalService.open(id);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

}
