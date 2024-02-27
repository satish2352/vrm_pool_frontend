import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsuperComponent } from './dashboardsuper.component';

describe('DashboardsuperComponent', () => {
  let component: DashboardsuperComponent;
  let fixture: ComponentFixture<DashboardsuperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardsuperComponent]
    });
    fixture = TestBed.createComponent(DashboardsuperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
