import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTemplateComponent } from './table-template.component';

describe('TableTemplateComponent', () => {
  let component: TableTemplateComponent;
  let fixture: ComponentFixture<TableTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableTemplateComponent]
    });
    fixture = TestBed.createComponent(TableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
