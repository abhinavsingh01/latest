import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomProductDetailComponent } from './ecom-product-detail.component';

describe('EcomProductDetailComponent', () => {
  let component: EcomProductDetailComponent;
  let fixture: ComponentFixture<EcomProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomProductDetailComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
