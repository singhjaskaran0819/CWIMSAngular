import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseLocationsComponent } from './warehouse-locations.component';

describe('WarehouseLocationsComponent', () => {
  let component: WarehouseLocationsComponent;
  let fixture: ComponentFixture<WarehouseLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
