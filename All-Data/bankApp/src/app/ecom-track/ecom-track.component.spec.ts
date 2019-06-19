import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomTrackComponent } from './ecom-track.component';

describe('EcomTrackComponent', () => {
  let component: EcomTrackComponent;
  let fixture: ComponentFixture<EcomTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcomTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcomTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
