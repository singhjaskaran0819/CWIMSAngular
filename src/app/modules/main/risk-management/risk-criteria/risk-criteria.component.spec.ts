import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCriteriaComponent } from './risk-criteria.component';

describe('RiskCriteriaComponent', () => {
  let component: RiskCriteriaComponent;
  let fixture: ComponentFixture<RiskCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
