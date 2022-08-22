import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelContainerComponent } from './wheel-container.component';

describe('WheelContainerComponent', () => {
  let component: WheelContainerComponent;
  let fixture: ComponentFixture<WheelContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WheelContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WheelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
