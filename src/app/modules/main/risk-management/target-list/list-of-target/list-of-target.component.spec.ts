import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTargetComponent } from './list-of-target.component';

describe('ListOfTargetComponent', () => {
  let component: ListOfTargetComponent;
  let fixture: ComponentFixture<ListOfTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
