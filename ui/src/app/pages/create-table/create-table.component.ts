import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cell } from "src/app/components/cell-base/cell-base.component";
import { COLOR_PALETTE } from 'src/assets/color_palette';
import { Observable, BehaviorSubject, of } from 'rxjs';

enum CreationStyle {
  Unset = 0,
  FromScratch = 1,
  FromClone = 2,
}

// TODO: A huge portion of this class and the other table class
// are the exact same. I need to create a common base class that
// both inherit from.

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {

  public table: {[index: string]: BehaviorSubject<Cell>}[] = [];
  public columns: string[] = [];
  public groups: Set<string> = new Set<string>(["Default"]);
  public palette: {[index: string]: string} = { "Default": "#007173" };

  public tableInProgress: boolean = false;
  public creationStyle: CreationStyle = CreationStyle.Unset;
  public cloneForm: FormGroup;
  public cloneTableName: undefined;
  public tableSizeForm: FormGroup;
  public creationStyleForm: FormGroup;
  public tableNames: string[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
    this.creationStyleForm = this.initCreationStyleForm();
    this.cloneForm = this.initCloneForm();
    this.tableSizeForm = this.initTableSizeForm();
  }

  ngOnInit(): void {
    this.getTableNames();
  }

  initCloneForm() {
    return this.fb.group({
      name: "Table Name"
    });
  }

  initCreationStyleForm(): FormGroup {
    return this.fb.group({
      name: "Table Name",
      style: CreationStyle.Unset,
    });
  }

  initTableSizeForm(): FormGroup {
    return this.fb.group({
      name: "Table Name",
      rows: 0,
      columns: 0,
    });
  }

  async getTableNames(): Promise<void> {
    const response = await fetch("/api/tablenames")
    const json = await response.json();
    this.tableNames = json;
  }

  async initCells(): Promise<void> {
    if (this.tableInProgress) {
      const choice = confirm("Are you sure you want to reset EVERYTHING on the current page?");
      if (choice == false) {
        return
      }
    }

    const nameExist: string = "table name already exists... try another name";

    if (this.creationStyle === CreationStyle.FromClone
      && this.tableNames.includes(this.cloneForm.value.name)
    ) {
      alert(nameExist);
      return;
    }
    if (this.creationStyle === CreationStyle.FromScratch
      && this.tableNames.includes(this.tableSizeForm.value.name)
    ) {
      alert(nameExist);
      return;
    }

    this.tableInProgress = true;
    if (this.creationStyle === CreationStyle.FromScratch) {
      this.setTableFromScratch();
    } else if (this.creationStyle === CreationStyle.FromClone) {
      this.setTableFromClone();
    } else {
      console.error("This should not be a possible option");
    }
  }

  async setTableFromClone(): Promise<void> {
    const response = await fetch(`/api/tables/${this.cloneTableName}`);
    const json = await response.json();
    const data: {[index: string]: any}[] = json[0]["data"];

    const columns = [];
    for (const col of Object.keys(data[0])) {
      columns.push(col);
    }
    this.columns = columns;

    const table = [];
    for (const foo of data) {
      let row: {[index: string]: BehaviorSubject<Cell>} = {};
      for (let column of this.columns) {
        const groupBlock = foo[column]["GroupBlock"];
        this.groups.add(groupBlock);

        row[column] = new BehaviorSubject<Cell>({
          elementSymbol: foo[column]["Symbol"],
          elementName: foo[column]["Name"],
          elementNumber: foo[column]["AtomicNumber"],
          elementProperties: {
            GroupBlock: groupBlock,
          },
        });
      }
      table.push(row);
    }
    this.table = table;
    this.palette = this.generateColorPalette();
    console.log(this.table);
    console.log(this.palette);
    console.log(this.groups);
  }

  setTableFromScratch(): void {
    const columns = [];
    for (let i=0; i<this.tableSizeForm.value.columns; i++) {
      columns.push(`col${i}`);
    }
    this.columns = columns;

    const table = [];
    for (let i=0; i<this.tableSizeForm.value.rows; i++) {
      let row: {[index: string]: BehaviorSubject<Cell>} = {};
      for (let column of this.columns) {
        row[column] = new BehaviorSubject<Cell>({
          elementSymbol: "Symbol",
          elementName: "Name",
          elementNumber: "1",
          elementProperties: {
            GroupBlock: "Default",
          },
        });
      }
      table.push(row);
    }
    this.table = table;
    console.log(this.table);
  }

  generateColorPalette(): {[index: string]: string} {
    const palette: {[index: string]: string} = {};

    let i = 0;
    for (const group of this.groups) {
      palette[group] = COLOR_PALETTE[i];
      i++;
    }

    return palette;
  }

  onGroupBlockUpdate(groupBlock: any): void {
    console.log("onGroupBlockUpdate has been called", groupBlock);
    this.groups.add(groupBlock);
    this.palette = this.generateColorPalette();
    console.log("this.palette", this.palette);
  }

  async saveToDb(): Promise<void> {
    const tmpTable: {[index: string]: Cell}[] = [];

      for (const row of this.table) {
        const tmpRow: {[index: string]: Cell} = {};
        for (const col of this.columns) {
          const tmpCol: any = {}
          tmpCol["Name"] = row[col].value["elementName"];
          tmpCol["AtomicNumber"] = row[col].value["elementNumber"];
          tmpCol["Symbol"] = row[col].value["elementSymbol"];
          for (const prop in row[col].value.elementProperties) {
            tmpCol[prop] = row[col].value.elementProperties[prop]
          }

          tmpRow[col] = tmpCol;
        }
        tmpTable.push(tmpRow);
      }


    const data: any = {};
    data["name"] = this.tableSizeForm.value.name;
    data["date"] = new Date();
    data["data"] = tmpTable;

    console.log(data);

    const response = await fetch("/api/savetable", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    alert(`status: ${response.status}, body: ${JSON.stringify(await response.json())}`);

  }

}
