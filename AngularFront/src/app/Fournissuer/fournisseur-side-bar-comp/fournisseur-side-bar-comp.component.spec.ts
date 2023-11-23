import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurSideBarCompComponent } from './fournisseur-side-bar-comp.component';

describe('FournisseurSideBarCompComponent', () => {
  let component: FournisseurSideBarCompComponent;
  let fixture: ComponentFixture<FournisseurSideBarCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FournisseurSideBarCompComponent]
    });
    fixture = TestBed.createComponent(FournisseurSideBarCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
