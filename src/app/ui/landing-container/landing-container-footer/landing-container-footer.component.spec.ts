import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingContainerFooterComponent } from './landing-container-footer.component';

describe('LandingContainerFooterComponent', () => {
  let component: LandingContainerFooterComponent;
  let fixture: ComponentFixture<LandingContainerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingContainerFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingContainerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
