import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinMaxInfoComponent } from './min-max-info.component';

describe('MinMaxInfoComponent', () => {
  let component: MinMaxInfoComponent;
  let fixture: ComponentFixture<MinMaxInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinMaxInfoComponent]
    });
    fixture = TestBed.createComponent(MinMaxInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
