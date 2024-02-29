import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateusersdataComponent } from './updateusersdata.component';

describe('UpdateusersdataComponent', () => {
  let component: UpdateusersdataComponent;
  let fixture: ComponentFixture<UpdateusersdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateusersdataComponent]
    });
    fixture = TestBed.createComponent(UpdateusersdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
