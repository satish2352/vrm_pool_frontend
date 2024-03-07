import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAgetsUnderReportsComponent } from './one-agets-under-reports.component';

describe('OneAgetsUnderReportsComponent', () => {
  let component: OneAgetsUnderReportsComponent;
  let fixture: ComponentFixture<OneAgetsUnderReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneAgetsUnderReportsComponent]
    });
    fixture = TestBed.createComponent(OneAgetsUnderReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
