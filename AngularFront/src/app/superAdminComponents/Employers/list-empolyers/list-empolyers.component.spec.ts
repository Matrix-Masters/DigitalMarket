import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LIstEmpolyersComponent } from './list-empolyers.component';

describe('LIstEmpolyersComponent', () => {
  let component: LIstEmpolyersComponent;
  let fixture: ComponentFixture<LIstEmpolyersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LIstEmpolyersComponent]
    });
    fixture = TestBed.createComponent(LIstEmpolyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
