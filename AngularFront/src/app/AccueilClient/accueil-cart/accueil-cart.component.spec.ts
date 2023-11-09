import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilCartComponent } from './accueil-cart.component';

describe('AccueilCartComponent', () => {
  let component: AccueilCartComponent;
  let fixture: ComponentFixture<AccueilCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilCartComponent]
    });
    fixture = TestBed.createComponent(AccueilCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
