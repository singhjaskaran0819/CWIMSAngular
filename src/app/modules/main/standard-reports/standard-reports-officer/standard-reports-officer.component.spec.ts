import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardReportsOfficerComponent } from './standard-reports-officer.component';

describe('StandardReportsOfficerComponent', () => {
  let component: StandardReportsOfficerComponent;
  let fixture: ComponentFixture<StandardReportsOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardReportsOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardReportsOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
