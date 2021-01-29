import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryListAdminComponent } from './inventory-list-admin.component';

describe('InventoryListAdminComponent', () => {
  let component: InventoryListAdminComponent;
  let fixture: ComponentFixture<InventoryListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
