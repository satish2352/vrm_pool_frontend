import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadalllogComponent } from './uploadalllog.component';

describe('UploadalllogComponent', () => {
  let component: UploadalllogComponent;
  let fixture: ComponentFixture<UploadalllogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadalllogComponent]
    });
    fixture = TestBed.createComponent(UploadalllogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
