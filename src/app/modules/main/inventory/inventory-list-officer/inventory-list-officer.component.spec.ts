import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListOfficerComponent } from './inventory-list-officer.component';

describe('InventoryListOfficerComponent', () => {
  let component: InventoryListOfficerComponent;
  let fixture: ComponentFixture<InventoryListOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryListOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
