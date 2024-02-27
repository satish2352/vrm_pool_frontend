import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcalllogsupervisorComponent } from './allcalllogsupervisor.component';

describe('AllcalllogsupervisorComponent', () => {
  let component: AllcalllogsupervisorComponent;
  let fixture: ComponentFixture<AllcalllogsupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcalllogsupervisorComponent]
    });
    fixture = TestBed.createComponent(AllcalllogsupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
