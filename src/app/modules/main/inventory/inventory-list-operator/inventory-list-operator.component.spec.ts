import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListOperatorComponent } from './inventory-list-operator.component';

describe('InventoryListOperatorComponent', () => {
  let component: InventoryListOperatorComponent;
  let fixture: ComponentFixture<InventoryListOperatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryListOperatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
