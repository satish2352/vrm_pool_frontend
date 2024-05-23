import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedcalllogComponent } from './failedcalllog.component';

describe('FailedcalllogComponent', () => {
  let component: FailedcalllogComponent;
  let fixture: ComponentFixture<FailedcalllogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailedcalllogComponent]
    });
    fixture = TestBed.createComponent(FailedcalllogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
