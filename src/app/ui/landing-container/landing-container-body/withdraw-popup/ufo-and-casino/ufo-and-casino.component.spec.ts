import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UfoAndCasinoComponent } from './ufo-and-casino.component';

describe('UfoAndCasinoComponent', () => {
  let component: UfoAndCasinoComponent;
  let fixture: ComponentFixture<UfoAndCasinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UfoAndCasinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UfoAndCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
