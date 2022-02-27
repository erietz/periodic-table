import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Cell } from '../cell/cell.component';
import { periodic_data } from 'src/assets/periodic_grid';
import { COLOR_PALETTE } from 'src/assets/color_palette';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  public table: {[index: string]: any}[];
  public columns: string[];
  public groups: string[];
  public palette: {[index: string]: string};
  public properties: {[index: string]: string};

  @Input() inputTable: any = [];

  constructor() {
    [this.table, this.groups] = this.loadData(periodic_data);
    this.columns = Object.keys(this.table[0]);
    this.palette = this.generateColorPalette();
    this.properties = this.table[0][this.columns[0]]["elementProperties"];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGES HERE", changes);
    // [this.table, this.groups] = this.loadData(changes["inputTable"]["currentValue"]);
    // console.log("fetching table with name", changes["inputTable"]["currentValue"]);
    this.getTableByName(changes["inputTable"]["currentValue"]);
    // console.log("what the hell", this.table, this.groups);
  }

  ngOnInit(): void {
    console.log("ngOnInit has been called");
  }

  loadData(foo: any): [{[index: string]: Cell}[], string[]] {
    let data: {[index: string]: Cell}[] = [];
    let groups = new Set<string>();

    for (const row of foo) {
      let newRow: {[index: string]: Cell} = {};
      for (const col in row) {

        const d = row[col];

        newRow[col] = {
          'elementSymbol': d['Symbol'],
          'elementName': d['Name'],
          'elementNumber': d['AtomicNumber'],
          'elementProperties': d
        }

        if (d['GroupBlock'] != null && !groups.has(d['GroupBlock'])) {
          groups.add(d['GroupBlock']);
        }

      }
      data.push(newRow);
    }

    return [data, Array.from(groups)];
  }

  populateProperties(cell: Cell): void {
    this.properties = cell.elementProperties;
  }

  generateColorPalette(): {[index: string]: string} {
    const tmpPalette: {[index: string]: string} = {};

    for (let i=0; i<COLOR_PALETTE.length; i++) {
      if (this.groups[i] != null) {
        tmpPalette[this.groups[i]] = COLOR_PALETTE[i];
      }
    }

    return tmpPalette;
  }

  async getDefaultTable() {
    const response = await fetch("/api/tables/Default Table")
    const json = await response.json();
    this.table = json;
  };

  async getTableByName(name: string) {
    const response = await fetch(`/api/tables/${name}`)
    const json = await response.json();
    console.log("Results of fetching data", json[0]["data"]);
    // this.table = json[0]["data"];
    [this.table, this.groups] = this.loadData(json[0]["data"]);
    this.columns = Object.keys(this.table[0]);
    this.palette = this.generateColorPalette();

    console.log(`table ${name} has been fetched`, this.table, this.groups);
  }

}
