import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurInterfaceComponent } from './fournisseur-interface.component';

describe('FournisseurInterfaceComponent', () => {
  let component: FournisseurInterfaceComponent;
  let fixture: ComponentFixture<FournisseurInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurInterfaceComponent]
    });
    fixture = TestBed.createComponent(FournisseurInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
