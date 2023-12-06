import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-bootstrap/positioning/models';
import { AddSavingsAccountComponent } from 'src/app/forms/add-savings-account/add-savings-account.component';
import { CustomerResponse } from 'src/app/models/customer-response.model';
import { DialogData } from 'src/app/models/dialog-data.model';
import { SavingsAccountDTO } from 'src/app/models/savings-account.dto';
import { SavingsAccountModel } from 'src/app/models/savings-account.model';
import { CustomerTransactionService } from 'src/app/services/customer-transactions.service';
import { SavingsAccountsService } from 'src/app/services/savings-accounts.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DialogErrorSkeletonComponent } from 'src/app/shared/dialogs/dialog-error-skeleton/dialog-error-skeleton.component';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-savings-account',
  templateUrl: './savings-account.component.html',
  styleUrls: ['./savings-account.component.css'],
})
export class SavingsAccountComponent {
  searchForm: FormGroup;
  modalRef!: BsModalRef;
  currentSavingsAccounts: SavingsAccountDTO[] = [];
  tableColumns!: string[];
  visibleColumnElements!: string[];
  options!: Options;
  pageSize = 4;
  searchText!: string;
  colorColumnName: string = '';
  colorColumnAttributes!: Map<string, string>;
  collectionSize: number = 0;
  actionIntended: string = '';
  rowOptions: string[] = ['Open', 'Approve', 'Reject', 'Block', 'UnBlock'];
  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: SavingsAccountsService,
    private modalService: BsModalService,
    private snackBarService: SnackbarService,
    private router: Router,
    private customerTransactionService: CustomerTransactionService
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
      'Status',
    ];
    this.visibleColumnElements = [
      'savingsAccountId',
      'customerId',
      'customerName',
      'customerEmail',
      'customerPhone',
      'status',
    ];
    this.colorColumnName = 'status';
    this.colorColumnAttributes = new Map<string, string>([
      ['ACTIVE', 'green-text-transform'],
      ['REJECTED', 'red-text-transform'],
      ['APPLIED', 'custom-text-transform'],
      ['BLOCKED', 'blocked-text-transform'],
      ['CLOSED', 'grey-text-transform'],
    ]);
    this.tableColumns = tableColumns;
    this.getAllSavingsAccounts();
  }
  getAllSavingsAccounts() {
    this.accountService.getAllSavingsAccounts(1, 1000).subscribe((res) => {
      this.currentSavingsAccounts = res;
      console.log(res);

      this.collectionSize = this.currentSavingsAccounts.length;
    });
  }

  getSearch(searchText: string) {
    this.searchText = searchText;
    console.log('search button clicked ' + searchText);
    this.accountService
      .getSearchSavingsAccounts(1, 100, searchText)
      .subscribe((res) => {
        this.currentSavingsAccounts = res;
      });
  }
  createNewSavingsAccount(createButtonClicked: Event) {
    console.log('value emitted and  ' + createButtonClicked);
    this.modalRef = this.modalService.show(AddSavingsAccountComponent);
    this.modalRef.onHidden?.subscribe(() => {
      console.log('Modal closed. Performing additional actions.');
      this.getAllSavingsAccounts();
    });
  }

  rowOptionEvent(receivedEvent: any) {
    console.log(receivedEvent);
    this.actionIntended = receivedEvent[1];
    const status = receivedEvent[0].status;
    const savingsAccountId = receivedEvent[0].savingsAccountId;
    if (this.actionIntended === 'Open') {
      const customerId = receivedEvent[0].customerId;
      const customerName = receivedEvent[0].customerName;

      const queryParams = {
        customerId: customerId,
        customerName: customerName,
        status: status,
        savingsAccountId: savingsAccountId,
      };

      this.router.navigateByUrl(
        `/customer-savings-account?customerId=${queryParams.customerId}&customerName=${queryParams.customerName}&savingsAccountId=${queryParams.savingsAccountId}&status=${queryParams.status}`
      );
      console.log(this.actionIntended);
    } else if (status === 'REJECTED' || status === 'CLOSED') {
      if (status === 'REJECTED') {
        this.message =
          '  Sorry! Account Is Already Rejected We Can Not Change Status';
      } else {
        this.message =
          '  Sorry! Account Is Already Closed We Can Not Change Status';
      }
      this.snackBarService.showSnackBar(this.message);
      return;
    } else if (status === 'ACTIVE') {
      if (this.actionIntended === 'Block') {
        this.setStatus(savingsAccountId, 'BLOCKED');
        return;
      } else {
        this.snackBarService.showSnackBar(
          'Active Account Status Can Not Be Changed Other Than Blocked'
        );
        return;
      }
    } else if (status === 'BLOCKED') {
      if (this.actionIntended === 'UnBlock') {
        this.setStatus(savingsAccountId, 'ACTIVE');
        return;
      } else {
        this.snackBarService.showSnackBar(
          ' Blocked Account Can Only UnBlocked'
        );
        return;
      }
    } else if (
      this.actionIntended === 'Reject' &&
      receivedEvent[0].status?.toLowerCase() !== 'blocked'
    ) {
      this.setStatus(savingsAccountId, 'REJECTED');
      return;
    } else if (
      this.actionIntended === 'Approve' &&
      receivedEvent[0].status?.toLowerCase() !== 'blocked' &&
      receivedEvent[0].status?.toLowerCase() !== 'ACTIVE'
      // this.accountService.changeStatus(receivedEvent[1],this.actionIntended);
    ) {
      this.setStatus(savingsAccountId, 'ACTIVE');
      return;
    } else if (
      this.actionIntended === 'Block' &&
      receivedEvent[0].status?.toLowerCase() !== 'blocked'
    ) {
      this.setStatus(savingsAccountId, 'BLOCKED');
      return;
    } else if (this.actionIntended === 'UnBlock') {
      this.setStatus(savingsAccountId, 'ACTIVE');
    }
    let currentSavingsAccount: SavingsAccountModel = receivedEvent[0];
    this.accountService.modifySavingsAccount(currentSavingsAccount);
  }
  setStatus(savingAccountId: number, status: string) {
    const body = {
      savingAccountId: savingAccountId,
      isAllowOverDraft: '',
      overDraftLimit: 0,
      status: status,
    };

    this.customerTransactionService.overDraftAmount(body).subscribe(
      (response) => {
        if (response.code === 200) {
          this.currentSavingsAccounts.filter(
            (savingsAccount) =>
              savingsAccount.savingsAccountId === savingAccountId
          )[0].status = status;
          this.snackBarService.showSnackBar(
            'Congrats! status changed Successfully'
          );
        } else {
          console.log('Withdrawal failed. Response:', response);
          this.snackBarService.showSnackBar('Sorry! status change got Failed');
        }
      },
      (error) => {
        this.snackBarService.showSnackBar('Sorry! status change got Failed');
      }
    );
  }
}
