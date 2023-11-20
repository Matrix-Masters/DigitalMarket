import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandesComponent } from './list-commandes.component';

describe('ListCommandesComponent', () => {
  let component: ListCommandesComponent;
  let fixture: ComponentFixture<ListCommandesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCommandesComponent]
    });
    fixture = TestBed.createComponent(ListCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
