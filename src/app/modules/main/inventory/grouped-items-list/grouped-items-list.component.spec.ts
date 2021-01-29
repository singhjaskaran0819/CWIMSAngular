import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedItemsListComponent } from './grouped-items-list.component';

describe('GroupedItemsListComponent', () => {
  let component: GroupedItemsListComponent;
  let fixture: ComponentFixture<GroupedItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupedItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
