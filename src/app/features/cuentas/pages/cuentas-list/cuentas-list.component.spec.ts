import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasListComponent } from './cuentas-list.component';

describe('CuentasListComponent', () => {
  let component: CuentasListComponent;
  let fixture: ComponentFixture<CuentasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentasListComponent]
    });
    fixture = TestBed.createComponent(CuentasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
