import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceBarComponent } from './balance-bar.component';

describe('BalanceBarComponent', () => {
  let component: BalanceBarComponent;
  let fixture: ComponentFixture<BalanceBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceBarComponent]
    });
    fixture = TestBed.createComponent(BalanceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
