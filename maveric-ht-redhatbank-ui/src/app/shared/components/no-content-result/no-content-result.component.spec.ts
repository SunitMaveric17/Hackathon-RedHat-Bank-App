import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentResultComponent } from './no-content-result.component';

describe('NoContentResultComponent', () => {
  let component: NoContentResultComponent;
  let fixture: ComponentFixture<NoContentResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoContentResultComponent]
    });
    fixture = TestBed.createComponent(NoContentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
