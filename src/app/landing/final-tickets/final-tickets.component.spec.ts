import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalTicketsComponent } from './final-tickets.component';

describe('FinalTicketsComponent', () => {
  let component: FinalTicketsComponent;
  let fixture: ComponentFixture<FinalTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalTicketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
