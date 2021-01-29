import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCriteriaComponent } from './list-of-criteria.component';

describe('ListOfCriteriaComponent', () => {
  let component: ListOfCriteriaComponent;
  let fixture: ComponentFixture<ListOfCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
