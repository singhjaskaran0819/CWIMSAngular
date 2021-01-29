import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfFindingsComponent } from './list-of-findings.component';

describe('ListOfFindingsComponent', () => {
  let component: ListOfFindingsComponent;
  let fixture: ComponentFixture<ListOfFindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfFindingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfFindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
