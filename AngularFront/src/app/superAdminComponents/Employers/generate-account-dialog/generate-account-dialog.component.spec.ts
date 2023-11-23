import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAccountDialogComponent } from './generate-account-dialog.component';

describe('GenerateAccountDialogComponent', () => {
  let component: GenerateAccountDialogComponent;
  let fixture: ComponentFixture<GenerateAccountDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateAccountDialogComponent]
    });
    fixture = TestBed.createComponent(GenerateAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
