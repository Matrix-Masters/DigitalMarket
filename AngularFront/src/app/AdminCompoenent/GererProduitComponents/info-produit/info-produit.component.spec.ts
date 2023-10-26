import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProduitComponent } from './info-produit.component';

describe('InfoProduitComponent', () => {
  let component: InfoProduitComponent;
  let fixture: ComponentFixture<InfoProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoProduitComponent]
    });
    fixture = TestBed.createComponent(InfoProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
