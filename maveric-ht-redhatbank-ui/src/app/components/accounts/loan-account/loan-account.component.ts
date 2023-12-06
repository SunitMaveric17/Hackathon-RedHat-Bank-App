import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Options } from '@popperjs/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddLoanAccountComponent } from 'src/app/forms/add-loan-account/add-loan-account.component';
import { LoanAccountsModel } from 'src/app/models/loan-account.model';
import { LoanAccountsService } from 'src/app/services/loan-accounts.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-loan-account',
  templateUrl: './loan-account.component.html',
  styleUrls: ['./loan-account.component.css'],
})
export class LoanAccountComponent {
  searchForm: FormGroup;
  modalRef!: BsModalRef;
  currentLoanAccounts: LoanAccountsModel[] = [];
  tableColumns!: string[];
  visibleColumnElements!: string[];
  options!: Options;
  pageSize = 4;
  searchText!: string;
  colorColumnName: string = '';
  colorColumnAttributes!: Map<string, string>;
  actionIntended: string = '';
  collectionSize: number = 0;
  rowOptions: string[] = ['Open', 'Approve', 'Reject', 'Withdraw'];
  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private accountService: LoanAccountsService,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.searchForm = this.formBuilder.group({
      searchBar: [''],
    });
  }

  ngOnInit() {
    const tableColumns = [
      'Application ID',
      'Customer ID',
      'Name',
      'Email ID',
      'Phone Number',
      'Loan Status',
    ];
    this.tableColumns = tableColumns;
    this.visibleColumnElements = [
      'loanId',
      'customerId',
      'customerName',
      'email',
      'phoneNumber',
      'status',
    ];
    this.colorColumnName = 'status';
    this.colorColumnAttributes = new Map<string, string>([
      ['APPROVED', 'green-text-transform'],
      ['REJECTED', 'red-text-transform'],
      ['APPLIED', 'custom-text-transform'],
      ['WITHDRAW', 'grey-text-transform'],
    ]);
    this.getAllLoanAccounts();
  }

  getAllLoanAccounts() {
    this.accountService.getAllLoanAccounts().subscribe((res) => {
      this.currentLoanAccounts = res;
      console.log(res);

      this.collectionSize = this.currentLoanAccounts.length;
    });
  }
  modifyLoanAccountStatus(applicationId: number, statusUpdate: string) {
    this.accountService
      .modifyLoanAccount(applicationId, statusUpdate)
      .subscribe(
        (res) => {
          console.log(res);
          this.snackbarService.showSnackBar('Loan ' + statusUpdate);
        },
        (error) => {
          console.log(error);
          this.snackbarService.showSnackBar('Update error');
        }
      );
    this.getAllLoanAccounts();
  }

  getSearch(searchText: string) {
    console.log('Searching for loan Accounts');
    this.accountService.getSearchLoanAccounts(searchText).subscribe(
      (res) => {
        console.log(res);
        this.currentLoanAccounts = res;
        this.collectionSize = this.currentLoanAccounts.length;
      },
      (err) => {
        console.log(err);
        if (err.error.code == 404) {
          this.snackbarService.showSnackBar(
            'No Loan Accounts found in database as per the given field'
          );
        } else {
          this.snackbarService.showSnackBar(
            '500 internal server error. Call service for assistance'
          );
        }
      }
    );
    console.log('Searched for loan accounts');
  }

  createNewLoanAccount(createButtonClicked: Event) {
    console.log('Create loan account button ');
    this.modalRef = this.modalService.show(AddLoanAccountComponent);
    this.modalRef.onHidden?.subscribe(() => {
      this.getAllLoanAccounts();
    });
  }

  rowOptionEvent(receivedEvent: any) {
    this.actionIntended = receivedEvent[1];
    let loanAccountDetails: LoanAccountsModel = receivedEvent[0];
    if (this.actionIntended === 'Open') {
      const customerId = loanAccountDetails.customerId;
      const customerName = loanAccountDetails.customerName;
      const status = loanAccountDetails.status;
      const loanAmt = loanAccountDetails.loanAmount;
      const account = loanAccountDetails.savingsAccount;
      const loanId = loanAccountDetails.loanId;
      console.log('Opening loan account of customer transaction history');
      // I want to call that Transaction history and send the inputs fom here
      this.router.navigate([
        '/customer-payment-history',
        customerId,
        customerName,
        loanAmt,
        account,
        loanId,
        status,
      ]);
    } else {
      if (this.actionIntended == 'Approve') {
        this.actionIntended = 'APPROVED';
      } else if (this.actionIntended == 'Reject') {
        this.actionIntended = 'REJECTED';
      } else if (this.actionIntended == 'Withdraw') {
        this.actionIntended = 'WITHDRAW';
      }
      console.log('Loan ' + this.actionIntended);
      console.log(loanAccountDetails.loanId, this.actionIntended);
      if (loanAccountDetails.status.toLowerCase() == 'applied') {
        this.modifyLoanAccountStatus(
          loanAccountDetails.loanId,
          this.actionIntended
        );
        this.getAllLoanAccounts();
      } else if (loanAccountDetails.status) {
        this.snackbarService.showSnackBar(
          'Changing from ' +
            loanAccountDetails.status +
            ' to ' +
            this.actionIntended +
            ' is forbidden'
        );
      }
    }
    console.log('Row option event finished');
  }
}
