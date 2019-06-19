import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomProductComponent } from './ecom-product.component';

describe('EcomProductComponent', () => {
  let component: EcomProductComponent;
  let fixture: ComponentFixture<EcomProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomProductComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
