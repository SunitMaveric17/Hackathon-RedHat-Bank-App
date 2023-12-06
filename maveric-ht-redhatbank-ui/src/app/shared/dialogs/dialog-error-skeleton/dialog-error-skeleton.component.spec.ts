import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogErrorSkeletonComponent } from './dialog-error-skeleton.component';

describe('DialogErrorSkeletonComponent', () => {
  let component: DialogErrorSkeletonComponent;
  let fixture: ComponentFixture<DialogErrorSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogErrorSkeletonComponent]
    });
    fixture = TestBed.createComponent(DialogErrorSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
