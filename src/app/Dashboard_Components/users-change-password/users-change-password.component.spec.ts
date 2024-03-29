import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChangePasswordComponent } from './users-change-password.component';

describe('UsersChangePasswordComponent', () => {
  let component: UsersChangePasswordComponent;
  let fixture: ComponentFixture<UsersChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersChangePasswordComponent]
    });
    fixture = TestBed.createComponent(UsersChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
