import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Cell } from '../cell-base/cell-base.component';
import { COLOR_PALETTE } from 'src/assets/color_palette';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  public table: {[index: string]: any}[] = [];
  public columns: string[] = [];
  public groups: Set<string> = new Set<string>();
  public palette: {[index: string]: string} = {};
  public properties: {[index: string]: string} = {};

  @Input() inputTable: any = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadTableByName(changes["inputTable"]["currentValue"]);
  }

  ngOnInit(): void {
    this.loadTableByName("Elements");
  }

  async loadTableByName(name: string): Promise<void>{
    const response = await fetch(`/api/tables/${name}`)
    const json = await response.json();
    [this.table, this.groups] = this.parseData(json[0]["data"]);
    this.columns = Object.keys(this.table[0]);
    this.palette = this.generateColorPalette();
    this.properties = this.table[0][this.columns[0]]["elementProperties"];
  }


  parseData(foo: any): [{[index: string]: Cell}[], Set<string>] {
    let data: {[index: string]: Cell}[] = [];
    let groups = new Set<string>();

    for (const row of foo) {
      let newRow: {[index: string]: Cell} = {};
      for (const col in row) {

        const d = row[col];

        newRow[col] = {
          elementSymbol: d['Symbol'],
          elementName: d['Name'],
          elementNumber: d['AtomicNumber'],
          elementProperties: d
        }

        if (d['GroupBlock'] != null && !groups.has(d['GroupBlock'])) {
          groups.add(d['GroupBlock']);
        }

      }
      data.push(newRow);
    }

    return [data, groups];
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

  // used in the html to populates the properties table on the left
  populateProperties(cell: Cell): void {
    this.properties = cell.elementProperties;
  }

}
