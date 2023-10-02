import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBalanceComponent } from './time-balance.component';

describe('TimeBalanceComponent', () => {
  let component: TimeBalanceComponent;
  let fixture: ComponentFixture<TimeBalanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeBalanceComponent]
    });
    fixture = TestBed.createComponent(TimeBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
