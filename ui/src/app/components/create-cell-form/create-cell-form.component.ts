import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Cell} from '../cell-base/cell-base.component';
import { ChangeDetectionStrategy } from "@angular/core";  // import

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-cell-form',
  templateUrl: './create-cell-form.component.html',
  styleUrls: ['./create-cell-form.component.scss'],
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
      elementProperties: this.fb.array([
        this.fb.group({
          name: "GroupBlock",
          description: this.cellInfo?.elementProperties["GroupBlock"] || "Default",
        })
      ])
    });
  }

  get elementProperties(): FormArray {
    return this.cellForm.get('elementProperties') as FormArray;
  }

  addElementProperty(): void {
    this.elementProperties.push(
      this.fb.group({
        name: "",
        description: "",
      })
    );
  }

  removeElementProperty(index: number): void {
    this.elementProperties.removeAt(index);
  }

  formInvalid(): boolean {
    console.log("valid -> ", this.cellForm.valid);
    return this.cellForm.valid
  }

  saveCell(): void {
    this.dialogRef.close(this.cellForm.value);
    // console.log(this.cellForm);
    console.log(this.cellForm.value);
  }

}
