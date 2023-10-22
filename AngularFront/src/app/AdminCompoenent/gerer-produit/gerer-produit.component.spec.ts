import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererProduitComponent } from './gerer-produit.component';

describe('GererProduitComponent', () => {
  let component: GererProduitComponent;
  let fixture: ComponentFixture<GererProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GererProduitComponent]
    });
    fixture = TestBed.createComponent(GererProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
