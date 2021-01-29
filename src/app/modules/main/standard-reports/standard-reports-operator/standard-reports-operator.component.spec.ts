import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardReportsOperatorComponent } from './standard-reports-operator.component';

describe('StandardReportsOperatorComponent', () => {
  let component: StandardReportsOperatorComponent;
  let fixture: ComponentFixture<StandardReportsOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardReportsOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardReportsOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
