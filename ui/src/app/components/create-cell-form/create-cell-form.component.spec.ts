import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCellFormComponent } from './create-cell-form.component';

describe('CreateCellFormComponent', () => {
  let component: CreateCellFormComponent;
  let fixture: ComponentFixture<CreateCellFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCellFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
