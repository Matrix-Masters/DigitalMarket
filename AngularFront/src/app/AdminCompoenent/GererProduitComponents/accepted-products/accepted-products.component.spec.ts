import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedProductsComponent } from './accepted-products.component';

describe('AcceptedProductsComponent', () => {
  let component: AcceptedProductsComponent;
  let fixture: ComponentFixture<AcceptedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedProductsComponent]
    });
    fixture = TestBed.createComponent(AcceptedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
