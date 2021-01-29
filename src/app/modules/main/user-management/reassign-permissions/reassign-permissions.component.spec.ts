import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignPermissionsComponent } from './reassign-permissions.component';

describe('ReassignPermissionsComponent', () => {
  let component: ReassignPermissionsComponent;
  let fixture: ComponentFixture<ReassignPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReassignPermissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReassignPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
