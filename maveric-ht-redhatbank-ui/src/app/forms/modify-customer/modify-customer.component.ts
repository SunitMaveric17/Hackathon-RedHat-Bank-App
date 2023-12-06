import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerModel } from 'src/app/models/customer.model';
import { DialogData } from 'src/app/models/dialog-data.model';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';
import { DialogErrorSkeletonComponent } from 'src/app/shared/dialogs/dialog-error-skeleton/dialog-error-skeleton.component';
import { DialogSkeletonComponent } from 'src/app/shared/dialogs/dialog-skeleton/dialog-skeleton.component';

@Component({
  selector: 'app-modify-customer',
  templateUrl: './modify-customer.component.html',
  styleUrls: ['./modify-customer.component.css'],
})
export class ModifyCustomerComponent {
  customerData!: CustomerModel;
  modifyCustomerForm: FormGroup;
  customerFound!: CustomerModel;
  customerId: number = 0;
  @Output() customerModified: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  citiesAvailable: string[] = ['Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
  constructor(
    private formBuilder: FormBuilder,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private customerService: CustomerAccountsService
  ) {
    this.modifyCustomerForm = this.formBuilder.group({
      customerId: [''],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern(/^[A-Z][a-z]*$/),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern(/^[A-Z][a-z]*$/),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]{10}$/),
        ],
      ],
      city: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log('Customer data fetched and patching now');
    console.log(this.customerData);
    this.customerId = this.customerData.customerId;
    this.modifyCustomerForm.patchValue({
      customerId: this.customerData.customerId,
      firstName: this.customerData.firstName,
      lastName: this.customerData.lastName,
      email: this.customerData.email,
      phoneNumber: this.customerData.phoneNumber,
      city: this.customerData.city,
    });
  }

  getCustomer(customerId: number) {
    return this.customerService.getCustomer(customerId).subscribe((res) => {
      console.log('Get Customer Called');
      this.customerFound = res;
      console.log(this.customerFound);
    });
  }

  onSubmit() {
    this.customerService
      .modifyCustomer(this.customerId, this.modifyCustomerForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          const dialogData: DialogData = {
            message: 'Congrats! Customer Details Modification Successful',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogSkeletonComponent, { initialState });
          this.bsModalRef.hide();
          this.customerModified.emit(true);
        },
        (error) => {
          const dialogData: DialogData = {
            message: 'Unable to perform Modify Customer Details',
          };
          const initialState = {
            dialogData: dialogData,
          };
          this.modalService.show(DialogErrorSkeletonComponent, {
            initialState,
          });
          this.bsModalRef.hide();
          console.log(error);
        }
      );
  }

  onCancel() {
    this.bsModalRef.hide();
    this.customerModified.emit(false);
  }
}
