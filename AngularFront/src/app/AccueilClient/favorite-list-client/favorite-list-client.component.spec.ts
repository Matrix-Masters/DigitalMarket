import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListClientComponent } from './favorite-list-client.component';

describe('FavoriteListClientComponent', () => {
  let component: FavoriteListClientComponent;
  let fixture: ComponentFixture<FavoriteListClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteListClientComponent]
    });
    fixture = TestBed.createComponent(FavoriteListClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
