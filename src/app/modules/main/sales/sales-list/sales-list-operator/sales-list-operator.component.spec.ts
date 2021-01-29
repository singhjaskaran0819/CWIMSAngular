import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesListOperatorComponent } from './sales-list-operator.component';

describe('SalesListOperatorComponent', () => {
  let component: SalesListOperatorComponent;
  let fixture: ComponentFixture<SalesListOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesListOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesListOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
