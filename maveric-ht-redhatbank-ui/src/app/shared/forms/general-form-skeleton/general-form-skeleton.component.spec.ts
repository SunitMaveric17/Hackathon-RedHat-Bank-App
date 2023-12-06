import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralFormSkeletonComponent } from './general-form-skeleton.component';

describe('GeneralFormSkeletonComponent', () => {
  let component: GeneralFormSkeletonComponent;
  let fixture: ComponentFixture<GeneralFormSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralFormSkeletonComponent]
    });
    fixture = TestBed.createComponent(GeneralFormSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
