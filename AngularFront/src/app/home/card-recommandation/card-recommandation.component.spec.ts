import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecommandationComponent } from './card-recommandation.component';

describe('CardRecommandationComponent', () => {
  let component: CardRecommandationComponent;
  let fixture: ComponentFixture<CardRecommandationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardRecommandationComponent]
    });
    fixture = TestBed.createComponent(CardRecommandationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
