import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployerComponent } from './add-employer.component';

describe('AddEmployerComponent', () => {
  let component: AddEmployerComponent;
  let fixture: ComponentFixture<AddEmployerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmployerComponent]
    });
    fixture = TestBed.createComponent(AddEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
