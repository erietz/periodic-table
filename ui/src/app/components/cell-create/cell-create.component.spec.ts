import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellCreateComponent } from './cell-create.component';

describe('CellCreateComponent', () => {
  let component: CellCreateComponent;
  let fixture: ComponentFixture<CellCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
