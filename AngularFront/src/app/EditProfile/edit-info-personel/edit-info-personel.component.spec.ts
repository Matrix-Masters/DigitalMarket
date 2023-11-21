import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInfoPersonelComponent } from './edit-info-personel.component';

describe('EditInfoPersonelComponent', () => {
  let component: EditInfoPersonelComponent;
  let fixture: ComponentFixture<EditInfoPersonelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInfoPersonelComponent]
    });
    fixture = TestBed.createComponent(EditInfoPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
