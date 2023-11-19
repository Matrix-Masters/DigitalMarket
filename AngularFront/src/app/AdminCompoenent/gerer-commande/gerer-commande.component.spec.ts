import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererCommandeComponent } from './gerer-commande.component';

describe('GererCommandeComponent', () => {
  let component: GererCommandeComponent;
  let fixture: ComponentFixture<GererCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GererCommandeComponent]
    });
    fixture = TestBed.createComponent(GererCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
