import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { DialogModule } from 'primeng/dialog';
import { Dropdown } from 'primeng/dropdown';
import { DialogData } from 'src/app/models/dialog-data.model';
import { TransactionDto } from 'src/app/models/transations.dto';
import { CustomerTransactionService } from 'src/app/services/customer-transactions.service';
import { DialogErrorSkeletonComponent } from 'src/app/shared/dialogs/dialog-error-skeleton/dialog-error-skeleton.component';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-customer-savings-account',
  templateUrl: './customer-savings-account.component.html',
  styleUrls: ['./customer-savings-account.component.css'],
})
export class CustomerSavingsAccountComponent implements OnInit, AfterViewInit {
  @ViewChild('confirmationModal') confirmationModal: any;
  transactions!: TransactionDto[];
  dialogIsOpen = false;
  dialogMessage = '';
  isModifyClicked: boolean = false;
  isModalOpen: boolean = false;
  customerId!: number;
  customerName!: string;
  status!: string;

  savingsAccountId!: number;
  isOverDraftChecked!: boolean;
  tableColumns!: string[];
  visibleColumnElements!: string[];
  collectionSize: number = 0;
  pageSize = 4;
  rowOptions: string[] = [];
  depositAmount!: number;
  withdrawAmount!: number;
  overDraftAmount!: number;
  close: boolean = false;
  block: boolean = false;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private modalService: BsModalService,
    private customerTransactionService: CustomerTransactionService
  ) {}
  ngAfterViewInit(): void {
    const dropdownElement = this.el.nativeElement.querySelector('p-dropdown');
    if (dropdownElement) {
      // Apply the 'order: -1;' style to the p-dropdown element
      // this.renderer.setStyle(dropdownElement, 'order', '-1');
      const labelElement = this.renderer.createElement('label');
      const labelText = this.renderer.createText('Show');

      // Apply the 'order: -1;' style to the label element
      this.renderer.setStyle(labelElement, 'order', '-2');
      this.renderer.setStyle(dropdownElement, 'order', '-1');

      // Append the text to the label
      this.renderer.appendChild(labelElement, labelText);

      // Insert the label before the dropdown element
      this.renderer.insertBefore(
        dropdownElement.parentElement,
        labelElement,
        dropdownElement
      );
    }
  }
  ngOnInit(): void {
    const tableColumns = ['Date', 'Description', 'Amount', 'Type', 'Balance'];

    this.visibleColumnElements = [
      'date',
      'description',
      'amount',
      'type',
      'balance',
    ];
    this.tableColumns = tableColumns;
    this.route.queryParams.subscribe((params) => {
      this.customerId = params['customerId'];
      this.customerName = params['customerName'];
      this.savingsAccountId = params['savingsAccountId'];
      this.status = params['status'];
      this.close=this.status=="CLOSED"?true:false;
    });

    this.getAllTransactions();
  }

  getAllTransactions() {
    this.customerTransactionService
      .getTransactionsForSavingsAccount(this.savingsAccountId, 1, 1000)
      .subscribe((response) => {
        console.log(response);

        this.transactions = response;
        this.collectionSize = this.transactions.length;
      });
  }

  onClickOfDeposit() {
    this.customerTransactionService
      .depositsAmount(this.savingsAccountId, this.depositAmount)
      .subscribe(
        (response) => {
          if (response.code === 201) {
            this.getAllTransactions();

            const dialogData: DialogData = {
              message: 'Congrats! Deposit Successful',
            };
            const initialState = {
              dialogData: dialogData,
            };
            this.depositAmount = 0;
            this.modalService.show(DialogSkeletonComponent, { initialState });
          } else {
            const dialogData: DialogData = {
              message: 'Sorry! Deposit Failed',
            };
            const initialState = {
              dialogData: dialogData,
            };
            this.modalService.show(DialogErrorSkeletonComponent, {
              initialState,
            });
          }
          // Handle success, update UI, etc.
        },
        (error) => {
          const dialogData: DialogData = {
            message: 'Sorry! Deposit Failed',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogErrorSkeletonComponent, {
            initialState,
          });
          // Handle error, show error message, etc.
        }
      );
  }
  onClickOfWithdraw() {
    this.customerTransactionService
      .withdrawAmount(this.savingsAccountId, this.withdrawAmount)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.code === 201) {
            this.getAllTransactions();

            const dialogData: DialogData = {
              message: 'Congrats! Withdraw Successful',
            };
            const initialState = {
              dialogData: dialogData,
            };
            this.withdrawAmount = 0;
            this.modalService.show(DialogSkeletonComponent, { initialState });
            console.log('Withdrawal successful', response);
            // Handle success, update UI, etc.\
          }
        },
        (error) => {
          console.log(error);

          const dialogData: DialogData = {
            message: 'Sorry! withdraw Failed: ' + error.error.errors[0].message,
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogErrorSkeletonComponent, {
            initialState,
          });
          // Handle error, show error message, etc.
        }
      );
  }

  onClickOfOverDraft() {
    const body = {
      savingAccountId: this.savingsAccountId,
      isAllowOverDraft: true,
      overDraftLimit: this.overDraftAmount,
      status: 'APPLIED',
    };

    this.customerTransactionService.overDraftAmount(body).subscribe(
      (response) => {
        if (response.code === 200) {
          const dialogData: DialogData = {
            message: 'Congrats! OverDraft added Successfully',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogSkeletonComponent, { initialState });
        } else {
          console.log('Withdrawal failed. Response:', response);
          const dialogData: DialogData = {
            message: 'Sorry! OverDraft process Failed' + response,
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogErrorSkeletonComponent, {
            initialState,
          });
        }
      },
      (error) => {
        const dialogData: DialogData = {
          message: 'Sorry! OverDraft process Failed',
        };
        const initialState = {
          dialogData: dialogData,
        };
        this.modalService.show(DialogErrorSkeletonComponent, { initialState });
      }
    );
  }

  onModify() {
    this.isModifyClicked = !this.isModifyClicked;
  }
  onClose() {
    this.close = true;
  }
  onBlock() {
    const body = {
      savingAccountId: this.savingsAccountId,
      isAllowOverDraft: '',
      overDraftLimit: 0,
      status: 'BLOCKED',
    };

    this.customerTransactionService.overDraftAmount(body).subscribe(
      (response) => {
        if (response.code === 200) {
          this.status = 'BLOCKED';
          const dialogData: DialogData = {
            message: 'Account Blocked Successfully',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogSkeletonComponent, { initialState });
        } else {
          console.log('Withdrawal failed. Response:', response);
          const dialogData: DialogData = {
            message: 'Blocked unsuccessful',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogErrorSkeletonComponent, {
            initialState,
          });
        }
      },
      (error) => {
        const dialogData: DialogData = {
          message: 'Sorry! status change got Failed',
        };
        const initialState = {
          dialogData: dialogData,
        };
        this.modalService.show(DialogErrorSkeletonComponent, { initialState });
      }
    );
  }

  routeToSavingsTable() {
    this.router.navigateByUrl('/savings-accounts');
  }

  openConfirmationModal(): void {
    this.isModalOpen = true;
  }

  handleConfirmation(isConfirmed: boolean) {
    // Handle the confirmation result
    if (isConfirmed) {
      this.customerTransactionService
        .accountClosed(this.savingsAccountId)
        .subscribe((res) => {
          if (res.code == 200) {
            this.status = 'CLOSED';
            this.close = true;
            console.log(res);
            this.isModalOpen = false;
          }
        });
    } else {
      this.isModalOpen = false;
    }
    // this.modalService.close();
  }
}
