import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesListOfficerComponent } from './sales-list-officer.component';

describe('SalesListOfficerComponent', () => {
  let component: SalesListOfficerComponent;
  let fixture: ComponentFixture<SalesListOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesListOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesListOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
