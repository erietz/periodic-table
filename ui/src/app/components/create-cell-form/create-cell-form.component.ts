import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Cell} from '../cell-base/cell-base.component';

@Component({
  selector: 'app-create-cell-form',
  templateUrl: './create-cell-form.component.html',
  styleUrls: ['./create-cell-form.component.scss']
})
export class CreateCellFormComponent implements OnInit {
  public cellInfo: Cell;
  public cellForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Cell,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateCellFormComponent>
  ) {
    this.cellInfo = data;
    this.cellForm = this.initCellForm();
  }

  ngOnInit(): void {
  }

  initCellForm(): FormGroup {
    return this.fb.group({
      elementSymbol: this.cellInfo?.elementSymbol || "Test Symbol",
      elementName: this.cellInfo?.elementName || "Test Name",
      elementNumber: parseInt(this.cellInfo?.elementNumber) || 1,
      elementProperties: {}
    });
  }

  saveCell(): void {
    this.dialogRef.close(this.cellForm.value);
    console.log(this.cellForm);
  }

}
