import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddCustomerComponent } from 'src/app/forms/add-customer/add-customer.component';
import { CustomerAccountsService } from 'src/app/services/customer-accounts.service';
import { AccountTemplateComponent } from 'src/app/shared/components/account-template/account-template.component';
import { Options } from 'src/app/models/options.model';
import { CustomerResponse } from 'src/app/models/customer-response.model';
import { TableTemplateComponent } from 'src/app/shared/components/table-template/table-template.component';
import { CustomerModel } from 'src/app/models/customer.model';
import { ModifyCustomerComponent } from 'src/app/forms/modify-customer/modify-customer.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.css'],
})
export class CustomerAccountComponent {
  searchForm: FormGroup;
  modalRef: BsModalRef | undefined;
  currentCustomers: CustomerModel[] = [];
  page = 2;
  pageSize = 4;
  tableColumns!: string[];
  visibleColumnElements!: string[];
  response!: CustomerResponse;
  rowOptions: string[] = ['Modify'];
  searchText!: string;
  actionIntended: string = '';
  collectionSize: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerAccountsService,
    private modalService: BsModalService,
    private snackBarService: SnackbarService
  ) {
    this.searchForm = this.formBuilder.group({
      searchBar: [''],
    });
  }

  ngOnInit() {
    const tableColumns = [
      'First Name',
      'Last Name',
      'Email ID',
      'Phone Number',
      'City',
      'Customer ID',
    ];
    this.tableColumns = tableColumns;
    this.visibleColumnElements = [
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'city',
      'customerId',
    ];
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe((res) => {
      res = res.reverse();
      this.currentCustomers = res;
      this.collectionSize = this.currentCustomers.length;
      console.log('Getting All Customers');
      console.log(res);
    });
  }

  getSearchCustomers(searchText: string) {
    this.customerService.getSearchCustomers(searchText).subscribe(
      (res) => {
        this.currentCustomers = res;
        this.collectionSize = this.currentCustomers.length;
      },
      (err) => {
        console.log(err);
        if (err.error.code == 404) {
          this.snackBarService.showSnackBar(
            'No Customers found in database as per the given field'
          );
        } else {
          this.snackBarService.showSnackBar(
            '500 internal server error. Call service for assistance'
          );
        }
      }
    );
  }

  getSearch(searchText: string) {
    this.searchText = searchText;
    console.log('search button clicked ' + searchText);
    this.getSearchCustomers(searchText);
  }
  createNewCustomer(createButtonClicked: Event) {
    console.log('value emitted and  ' + createButtonClicked);
    this.modalRef = this.modalService.show(AddCustomerComponent);
    if (this.modalRef != undefined) {
      this.modalRef?.content?.bsModalRef?.onHide?.subscribe(
        (customerCreatedMessage: boolean) => {
          console.log(customerCreatedMessage);
          if (customerCreatedMessage) {
            this.getAllCustomers();
          }
        }
      );
    }
  }

  rowOptionEvent(receivedEvent: any) {
    this.actionIntended = receivedEvent[1];
    if (this.actionIntended === 'Modify') {
      console.log(this.actionIntended);
      // Get the selected customer object from receivedEvent[0]
      const selectedCustomer: CustomerModel = receivedEvent[0];
      // Open the ModifyCustomerComponent modal and pass the selected customer data
      const initialState = {
        customerData: selectedCustomer,
      };
      const modalRef = this.modalService.show(ModifyCustomerComponent, {
        initialState,
      });
      if (modalRef.content) {
        modalRef.content.customerModified.subscribe(
          (customerModified: boolean) => {
            if (customerModified) {
              this.getAllCustomers();
            }
          }
        );
      }
    }
  }
}
