import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPermissionComponent } from './access-permission.component';

describe('AccessPermissionComponent', () => {
  let component: AccessPermissionComponent;
  let fixture: ComponentFixture<AccessPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessPermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
