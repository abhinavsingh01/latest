import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BservicesComponent } from './bservices.component';

describe('BservicesComponent', () => {
  let component: BservicesComponent;
  let fixture: ComponentFixture<BservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
