import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurNavbarCompComponent } from './fournisseur-navbar-comp.component';

describe('FournisseurNavbarCompComponent', () => {
  let component: FournisseurNavbarCompComponent;
  let fixture: ComponentFixture<FournisseurNavbarCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurNavbarCompComponent]
    });
    fixture = TestBed.createComponent(FournisseurNavbarCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
