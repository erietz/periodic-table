import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellBaseComponent } from './cell-base.component';

describe('CellBaseComponent', () => {
  let component: CellBaseComponent;
  let fixture: ComponentFixture<CellBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
