import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';
import { SavingsAccountsService } from 'src/app/services/savings-accounts.service';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';
import { DialogData } from 'src/app/models/dialog-data.model';
import { DialogErrorSkeletonComponent } from 'src/app/shared/dialogs/dialog-error-skeleton/dialog-error-skeleton.component';

@Component({
  selector: 'app-add-savings-account',
  templateUrl: './add-savings-account.component.html',
  styleUrls: ['./add-savings-account.component.css'],
})
export class AddSavingsAccountComponent {
  addSavingsAccountForm: FormGroup;
  minOpeningBalanceAvailable: number[] = [1000, 2000, 5000, 10000];
  interestCompoundingPeriodAvailable: string[] = [
    'MONTHLY',
    'QUARTERLY',
    'ANNUALLY',
  ];
  overdraftLimitAvailable: number[] = [1000, 2000, 5000, 10000];
  allowOverdraftToggle: boolean = false;
  selectedFile!: File;
  customerFound: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private savingsService: SavingsAccountsService,
    private snackBarService: SnackbarService,
    private modalService: BsModalService,
    private customerService: CustomerAccountsService
  ) {
    this.addSavingsAccountForm = this.formBuilder.group({
      customerId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      minOpeningBalance: [0, [Validators.required]],
      interestCompoundPeriod: ['', [Validators.required]],
      overDraftLimit: [0],
    });
  }

  onOverdraftToggleClick(event: Event): void {
    this.allowOverdraftToggle = !this.allowOverdraftToggle;
  }

  getSavingsAccounts(customerId: number) {
    return this.customerService.getCustomer(customerId).subscribe(
      (res) => {
        console.log(res);
        this.customerFound = true;
        return res;
      },
      (err) => {
        this.customerFound = false;
        console.log(err);
      }
    );
  }

  onSubmit() {
    let formValues = this.addSavingsAccountForm.value;

    // Create an object with only the required fields
    let requiredValues: {
      customerId: any;
      customerName: any;
      phoneNumbe: any;
      minOpeningBalance: any;
      interestCompoundPeriod: any;
      isAllowOverDraft: boolean;
      overDraftLimit?: any;
    } = {
      customerId: formValues.customerId,
      customerName: formValues.name,
      phoneNumbe: formValues.phoneNumber,
      minOpeningBalance: formValues.minOpeningBalance,
      interestCompoundPeriod: formValues.interestCompoundPeriod,
      isAllowOverDraft: formValues.overDraftLimit > 0, // Assuming overDraftLimit is a boolean value
    };

    if (requiredValues.isAllowOverDraft) {
      requiredValues.overDraftLimit = formValues.overDraftLimit;
    }

    this.savingsService
      .addSavingsAccount(this.selectedFile, requiredValues)
      .subscribe(
        (response) => {
          console.log(response);
          const dialogData: DialogData = {
            message: 'Congrats! Savings Account Created Successful',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogSkeletonComponent, { initialState });
          this.bsModalRef.hide();
          return response;
        },
        (error) => {
          console.log(error);

          const dialogData: DialogData = {
            message: 'Unable to perform loan repayment',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogErrorSkeletonComponent, {
            initialState,
          });
          this.bsModalRef.hide();
        }
      );
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  searchCustomer() {
    const customerId = this.addSavingsAccountForm.get('customerId')?.value;
    if (customerId == null) {
      this.snackBarService.showSnackBar('Provide customerId');
      return;
    }
    this.patchValuesIntoForm();
  }

  patchValuesIntoForm() {
    this.customerService
      .getCustomer(this.addSavingsAccountForm.value.customerId)
      .subscribe(
        (res) => {
          this.customerFound = true;
          // this.getSavingsAccounts(this.addSavingsAccountForm.value.customerId);
          this.addSavingsAccountForm.controls['name'].setValue(
            res.firstName + ' ' + res.lastName
          );
          this.addSavingsAccountForm.controls['phoneNumber'].setValue(
            res.phoneNumber
          );
        },
        (error) => {
          this.customerFound = false;
          this.snackBarService.showSnackBar(
            'Unable to get customer with that ID ' +
              this.addSavingsAccountForm.value.customerId
          );
        }
      );
  }

  onCancel() {
    this.bsModalRef.hide();
    return;
  }
}
