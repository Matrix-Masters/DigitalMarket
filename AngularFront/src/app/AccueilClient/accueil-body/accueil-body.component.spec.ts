import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilBodyComponent } from './accueil-body.component';

describe('AccueilBodyComponent', () => {
  let component: AccueilBodyComponent;
  let fixture: ComponentFixture<AccueilBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilBodyComponent]
    });
    fixture = TestBed.createComponent(AccueilBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
