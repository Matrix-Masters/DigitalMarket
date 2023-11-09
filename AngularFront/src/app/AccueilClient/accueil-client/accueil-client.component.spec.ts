import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilClientComponent } from './accueil-client.component';

describe('AccueilClientComponent', () => {
  let component: AccueilClientComponent;
  let fixture: ComponentFixture<AccueilClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilClientComponent]
    });
    fixture = TestBed.createComponent(AccueilClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
