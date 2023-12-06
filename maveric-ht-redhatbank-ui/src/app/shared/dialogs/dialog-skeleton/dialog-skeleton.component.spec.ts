import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSkeletonComponent } from './dialog-skeleton.component';

describe('DialogSkeletonComponent', () => {
  let component: DialogSkeletonComponent;
  let fixture: ComponentFixture<DialogSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSkeletonComponent]
    });
    fixture = TestBed.createComponent(DialogSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
