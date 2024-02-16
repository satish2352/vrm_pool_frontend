import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSupervisorComponent } from './all-supervisor.component';

describe('AllSupervisorComponent', () => {
  let component: AllSupervisorComponent;
  let fixture: ComponentFixture<AllSupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSupervisorComponent]
    });
    fixture = TestBed.createComponent(AllSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
