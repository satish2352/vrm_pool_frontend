import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcalllogComponent } from './allcalllog.component';

describe('AllcalllogComponent', () => {
  let component: AllcalllogComponent;
  let fixture: ComponentFixture<AllcalllogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllcalllogComponent]
    });
    fixture = TestBed.createComponent(AllcalllogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
