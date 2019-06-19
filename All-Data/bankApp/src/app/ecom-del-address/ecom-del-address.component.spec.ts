import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomDelAddressComponent } from './ecom-del-address.component';

describe('EcomDelAddressComponent', () => {
  let component: EcomDelAddressComponent;
  let fixture: ComponentFixture<EcomDelAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomDelAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomDelAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
