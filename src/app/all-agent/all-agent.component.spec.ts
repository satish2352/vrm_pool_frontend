import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAgentComponent } from './all-agent.component';

describe('AllAgentComponent', () => {
  let component: AllAgentComponent;
  let fixture: ComponentFixture<AllAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAgentComponent]
    });
    fixture = TestBed.createComponent(AllAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
