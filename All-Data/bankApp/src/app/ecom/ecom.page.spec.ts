import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomPage } from './ecom.page';

describe('EcomPage', () => {
  let component: EcomPage;
  let fixture: ComponentFixture<EcomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
