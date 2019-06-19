import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomOrderComponent } from './ecom-order.component';

describe('EcomOrderComponent', () => {
  let component: EcomOrderComponent;
  let fixture: ComponentFixture<EcomOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
