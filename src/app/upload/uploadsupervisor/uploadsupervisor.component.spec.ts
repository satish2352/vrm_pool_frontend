import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsupervisorComponent } from './uploadsupervisor.component';

describe('UploadsupervisorComponent', () => {
  let component: UploadsupervisorComponent;
  let fixture: ComponentFixture<UploadsupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadsupervisorComponent]
    });
    fixture = TestBed.createComponent(UploadsupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
