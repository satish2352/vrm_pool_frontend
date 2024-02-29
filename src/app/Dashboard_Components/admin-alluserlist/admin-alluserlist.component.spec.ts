import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlluserlistComponent } from './admin-alluserlist.component';

describe('AdminAlluserlistComponent', () => {
  let component: AdminAlluserlistComponent;
  let fixture: ComponentFixture<AdminAlluserlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAlluserlistComponent]
    });
    fixture = TestBed.createComponent(AdminAlluserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
