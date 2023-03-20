import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratPopupComponent } from './congrat-popup.component';

describe('CongratPopupComponent', () => {
  let component: CongratPopupComponent;
  let fixture: ComponentFixture<CongratPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
