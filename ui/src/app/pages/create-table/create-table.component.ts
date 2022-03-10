import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../components/popup/popup.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Row, Column } from "src/app/types/types";
import { Cell } from "src/app/components/cell-base/cell-base.component";

// TODO: A huge portion of this class and the other table class
// are the exact same. I need to create a common base class that
// both inherit from.

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {

  public table: {[index: string]: any}[] = [];
  public columns: string[] = [];
  public groups: string[] = [];
  public palette: {[index: string]: string} = {};
  public tableSizeForm: FormGroup;
  public properties: {[index: string]: string} = {};

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.tableSizeForm = this.initTableSizeForm();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.setTable();
    console.log(this.tableSizeForm);
  }

  initTableSizeForm(): FormGroup {
    return this.fb.group({
      rows: 0,
      columns: 0,
    });
  }

  setTable(): void {
    const columns = [];
    for (let i=0; i<this.tableSizeForm.value.columns; i++) {
      columns.push(`col${i}`);
    }
    this.columns = columns;

    const table = [];
    for (let i=0; i<this.tableSizeForm.value.rows; i++) {
      const row: {[index: string]: Cell} = {};
      for (let column of this.columns) {
        row[column] = {
          elementSymbol: "foo",
          elementName: "bar",
          elementNumber: "bar",
          elementProperties: {},
        };
      }
      table.push(row);
    }
    this.table = table;

  }

  openDialog() {
    this.dialog.open(PopupComponent, {
      data: {
        tmpData: "This is a form to enter properties for a cell"
      }
    });
  }

  // used in the html to populates the properties table on the left
  populateProperties(cell: Cell): void {
    this.properties = cell.elementProperties;
  }

}
