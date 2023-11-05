import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererSupplierComponent } from './gerer-supplier.component';

describe('GererSupplierComponent', () => {
  let component: GererSupplierComponent;
  let fixture: ComponentFixture<GererSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GererSupplierComponent]
    });
    fixture = TestBed.createComponent(GererSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
