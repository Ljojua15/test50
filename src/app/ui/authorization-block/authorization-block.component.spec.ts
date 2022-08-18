import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationBlockComponent } from './authorization-block.component';

describe('AuthorizationBlockComponent', () => {
  let component: AuthorizationBlockComponent;
  let fixture: ComponentFixture<AuthorizationBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
