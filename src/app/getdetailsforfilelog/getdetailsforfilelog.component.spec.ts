import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdetailsforfilelogComponent } from './getdetailsforfilelog.component';

describe('GetdetailsforfilelogComponent', () => {
  let component: GetdetailsforfilelogComponent;
  let fixture: ComponentFixture<GetdetailsforfilelogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetdetailsforfilelogComponent]
    });
    fixture = TestBed.createComponent(GetdetailsforfilelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
