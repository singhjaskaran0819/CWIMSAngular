import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateDeclarationComponent } from './initiate-declaration.component';

describe('InitiateDeclarationComponent', () => {
  let component: InitiateDeclarationComponent;
  let fixture: ComponentFixture<InitiateDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateDeclarationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
