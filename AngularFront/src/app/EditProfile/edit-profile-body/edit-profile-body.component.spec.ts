import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileBodyComponent } from './edit-profile-body.component';

describe('EditProfileBodyComponent', () => {
  let component: EditProfileBodyComponent;
  let fixture: ComponentFixture<EditProfileBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileBodyComponent]
    });
    fixture = TestBed.createComponent(EditProfileBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
