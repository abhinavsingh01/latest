import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDelPaymentComponent } from './ecom-del-payment.component';

describe('EcomDelPaymentComponent', () => {
  let component: EcomDelPaymentComponent;
  let fixture: ComponentFixture<EcomDelPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDelPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDelPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
