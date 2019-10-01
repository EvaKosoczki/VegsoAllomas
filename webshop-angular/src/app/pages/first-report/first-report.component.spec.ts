import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstReportComponent } from './first-report.component';

describe('FirstReportComponent', () => {
  let component: FirstReportComponent;
  let fixture: ComponentFixture<FirstReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
