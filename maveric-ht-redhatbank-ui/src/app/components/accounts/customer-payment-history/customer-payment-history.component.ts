import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DialogData } from 'src/app/models/dialog-data.model';
import { LoanAccountsModel } from 'src/app/models/loan-account.model';
import { LoanTransactionHistoryModel } from 'src/app/models/loan-transaction-history.model';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DialogErrorSkeletonComponent } from 'src/app/shared/dialogs/dialog-error-skeleton/dialog-error-skeleton.component';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-customer-payment-history',
  templateUrl: './customer-payment-history.component.html',
  styleUrls: ['./customer-payment-history.component.css'],
})
export class CustomerPaymentHistoryComponent {
  customerId: number = 0;
  status: string = 'Inactive';
  customerName: string = 'Illegal Attempt';
  totalBalance: number = 0;
  loanId: number = 0;
  account: number = 0;
  activePage: boolean = false;
  colorColumnName: string = '';
  colorColumnAttributes!: Map<string, string>;
  page = 2;
  pageSize = 4;
  collectionSize = 1;
  tableColumns: string[] = [];
  visibleColumnElements: string[] = [];
  currentTransactionHistory!: LoanTransactionHistoryModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loanService: LoanAccountsService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.customerId = params['customerId'];
      this.status = params['status'];
      this.customerName = params['customerName'];
      this.totalBalance = params['loanAmt'];
      this.account = params['account'];
      this.loanId = params['loanId'];
      
      console.log('Customer ID:', this.customerId);
      console.log('Customer Name:', this.customerName);
      console.log('Total Balance:', this.totalBalance);
      console.log('Loan Account Number:', this.account);
      console.log('Status: ', this.status);
      console.log('Loan Id', this.loanId);

    });
    const tableColumns = ['Date', 'Description', 'Amount', 'Status', 'Balance'];
    this.tableColumns = tableColumns;
    this.visibleColumnElements = [
      'paidAt',
      'description',
      'amountPaid',
      'paymentStatus',
      'balance',
    ];
    this.setStatus(this.status);
    this.colorColumnName = 'paymentStatus';
    this.colorColumnAttributes = new Map<string, string>([
      ['RECEIVED', 'green-text-transform'],
      ['NOT RECEIVED', 'red-text-transform'],
    ]);
    this.getAllTransactionHistory();
  }
  submitRepayment(data: string) {
    if (!this.isPositiveNumber(data)) {
      console.log('The variable is a positive number greater than 0.');
      this.snackBarService.showSnackBar(
        'Provide valid input in the field for repayment'
      );
      return;
    }
    let body = {
      amount: data,
      accountId: this.account,
      loanId: this.loanId,
    };
    console.log('submitted' + body);
    this.loanService.postRepaymentAmount(body).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSnackBar(
          'Congrats! Loan Repayment Done Successfully'
        );
        this.getAllTransactionHistory();
        return response;
      },
      (error) => {
        console.log(error);
        if (error.error.errors?.errorCode == 400) {
          console.log(error.error.errors?.errorMessgae);
          this.snackBarService.showSnackBar(error.error.errors?.errorMessgae);
        } else {
          this.snackBarService.showSnackBar(
            'Unable to perform loan repayment due to Internal Error'
          );
        }
      }
    );
  }
  navigateToLoanAccounts() {
    this.router.navigateByUrl('/loan-accounts');
  }

  setStatus(status: string) {
    console.log(status);
    switch (status) {
      case 'APPROVED':
        this.activePage = true;
        break;
      default:
        this.activePage = false;
    }
  }
  getAllTransactionHistory() {
    console.log('Started Fetching transaction History');
    this.loanService
      .getTransActionHistoryByLoanId(this.loanId)
      .subscribe((res) => {
        console.log('Getting All Transaction History');
        console.log(res);
        this.currentTransactionHistory = res;
        this.collectionSize = this.currentTransactionHistory.length;
        if (this.currentTransactionHistory.length != 0) {
          this.totalBalance = this.currentTransactionHistory[0].balance;
        }
      });
    console.log('Finished Fetching Transaction History');
  }
  isPositiveNumber(value: any): boolean {
    return /^[1-9]\d*(\.\d+)?$/.test(value);
  }
}
