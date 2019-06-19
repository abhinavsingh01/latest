import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserServiceService } from '../user-service.service';
import { ApiServiceService } from '../api-service.service';
import { ModalserviceService } from '../modalservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LogoutComponent } from '../logout/logout.component';


@Component({
  selector: 'app-bservices',
  templateUrl: './bservices.component.html',
  styleUrls: ['./bservices.component.scss']
})
export class BservicesComponent implements OnInit {
@ViewChild('logt') logt:LogoutComponent;
  type: String = "";
  isSavingsAccount: boolean = false;
  isLoanAccount: boolean = false;
  isdeposit: boolean = false;
  isWithdraw: boolean = false;
  isWorkInProgress: boolean = false;
  isAccountDetail: boolean = false;
  savingAccounts: any[] = [];
  loanAccounts: any[] = [];
  accBalance: string = "";
  outstanding: string = "";
  emi: string = "";
  idx: number = 2;

  accountDetails: any = {};
  isAmountError: boolean = false;
  isAccountError: boolean = false;
  withdrawAmount: number = 0;
  depositAmount: number = 0;
  wAccount: string = "";
  dAccount: string = "";
  mHeading: string;
  mBody: string;


  constructor(private route: ActivatedRoute,
  private router: Router, private userService: UserServiceService,
  private api : ApiServiceService,
  private modalService: ModalserviceService,
  private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.withdrawAmount = 0;
    this.depositAmount = 0;
    this.load()
  }

  load(){
    this.type = this.route.snapshot.paramMap.get('type');
    switch(this.type){
      case "savings":
        this.isSavingsAccount = true;
        this.getSavingsAccList();
        break;
      case "loan":
        this.isLoanAccount = true;
        this.getLoanAccList();
        break;
      case "deposit":
        this.getSavingsAccList();
        this.isdeposit = true;
        break;
      case "withdraw":
        this.getSavingsAccList();
        this.isWithdraw = true;
        break;
      default:
        this.isWorkInProgress = true;
    }
  }

  getSavingsAccList(){
    this.savingAccounts = this.userService.getAccList("Savings");
  };

  getLoanAccList(){
    this.loanAccounts = this.userService.getAccList("Loan");
  };

  showAccountDetails(accNumber, type){
    this.spinner.show();
    this.api.getAccountDetils(accNumber, type).subscribe((data: any) => {
      this.spinner.hide();
      this.userService.storeAccountDetails(accNumber, data);
      if(type == "Savings"){
      this.accBalance = data.balance;
      delete data.status;
      delete data.balance;
      this.accountDetails = data
    }else if(type == "Loan"){
      this.outstanding = data.Outstanding;
      this.emi = data.EMIThisMonth;
      this.accountDetails = data
    }

  }, (err) => {alert("Something is wrong."); this.spinner.hide();});
    this.isSavingsAccount = false;
    this.isLoanAccount = false;
    this.isdeposit = false;
    this.isWithdraw = false;
    this.isWorkInProgress = false;
    this.isAccountDetail = true;
  }

  back(){
    if(this.isSavingsAccount || this.isLoanAccount || this.isdeposit || this.isWithdraw || this.isWorkInProgress){
      this.router.navigate(['/main']);
    }else if(this.isAccountDetail){
      this.isAccountDetail = false;
      this.load();
    }
  }

  withdrawAccountSelect(accNumber){
    this.wAccount = accNumber;
  }

  depoitAccountSelect(accNumber){
    this.dAccount = accNumber;
  }

  submitWithdraw(){
    this.spinner.show();
    let accDetails = this.userService.getAccountDetails(this.wAccount);
    let currency = accDetails.currencyCode;
    let cashBalance = accDetails.balance;
    this.api.withdraw(""+this.withdrawAmount, this.wAccount, currency, ""+cashBalance).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == "Success"){
        this.userService.updateAccount(this.wAccount, data.balance);
        this.mHeading = "Amount Withdrawn successfully"
        this.mBody = "Your withdraw request has been completed successfully."
        this.modalService.open("bank-modal");
      }else{
        this.mHeading = "Withdraw Failed"
        this.mBody = "Please try again."
        this.modalService.open("bank-modal");
      }
    }, (err) => {alert("Something is wrong."); this.spinner.hide();})
  }

  submitDeposit(){
    this.spinner.show();
    let accDetails = this.userService.getAccountDetails(this.dAccount);
    let currency = accDetails.currencyCode;
    let cashBalance = accDetails.balance;

    this.api.deposit(""+this.depositAmount, this.dAccount, currency, ""+cashBalance).subscribe((data: any) => {
      this.spinner.hide();
      if(data.status == "Success"){
        this.userService.updateAccount(this.dAccount, data.balance);
        this.mHeading = "Amount deposited successfully"
        this.mBody = "Your deposit request has been completed successfully."
        this.modalService.open("bank-modal");
      }else{
        this.mHeading = "Deposit Failed"
        this.mBody = "Please try again."
        this.modalService.open("bank-modal");
      }
    }, (err) => {alert("Something is wrong."); this.spinner.hide();})
  }

   closeModal(id){
    this.modalService.close(id);
    this.router.navigate(['/main']);
  }

  logout(){
    this.logt.logout();
  }
}
