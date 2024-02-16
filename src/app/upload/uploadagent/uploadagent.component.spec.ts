import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadagentComponent } from './uploadagent.component';

describe('UploadagentComponent', () => {
  let component: UploadagentComponent;
  let fixture: ComponentFixture<UploadagentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadagentComponent]
    });
    fixture = TestBed.createComponent(UploadagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
