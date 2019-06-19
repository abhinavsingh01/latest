import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomCartComponent } from './ecom-cart.component';

describe('EcomCartComponent', () => {
  let component: EcomCartComponent;
  let fixture: ComponentFixture<EcomCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
