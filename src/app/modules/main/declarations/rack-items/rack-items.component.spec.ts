import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackItemsComponent } from './rack-items.component';

describe('RackItemsComponent', () => {
  let component: RackItemsComponent;
  let fixture: ComponentFixture<RackItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RackItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RackItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
