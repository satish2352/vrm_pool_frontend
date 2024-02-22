import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorlistComponent } from './supervisorlist.component';

describe('SupervisorlistComponent', () => {
  let component: SupervisorlistComponent;
  let fixture: ComponentFixture<SupervisorlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorlistComponent]
    });
    fixture = TestBed.createComponent(SupervisorlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
