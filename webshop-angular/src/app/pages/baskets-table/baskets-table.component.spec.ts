import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketsTableComponent } from './baskets-table.component';

describe('BasketsTableComponent', () => {
  let component: BasketsTableComponent;
  let fixture: ComponentFixture<BasketsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
