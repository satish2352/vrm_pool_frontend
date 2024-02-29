import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllagentlistComponent } from './allagentlist.component';

describe('AllagentlistComponent', () => {
  let component: AllagentlistComponent;
  let fixture: ComponentFixture<AllagentlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllagentlistComponent]
    });
    fixture = TestBed.createComponent(AllagentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
