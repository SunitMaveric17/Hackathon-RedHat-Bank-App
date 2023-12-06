import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanIndividualAccountComponent } from './loan-individual-account.component';

describe('LoanIndividualAccountComponent', () => {
  let component: LoanIndividualAccountComponent;
  let fixture: ComponentFixture<LoanIndividualAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanIndividualAccountComponent]
    });
    fixture = TestBed.createComponent(LoanIndividualAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
