import { Component, OnInit } from '@angular/core';
import { Cell } from '../cell/cell.component';
import { periodic_data } from 'src/assets/periodic_grid';
import { COLOR_PALETTE } from 'src/assets/color_palette';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  // TODO change any to a better type
  public table: {[index: string]: any}[];
  public columns: string[];
  public groups: string[];
  public palette: {[index: string]: string};
  public properties: {[index: string]: string};

  constructor() {
    [this.table, this.groups] = this.loadData();
    this.columns = Object.keys(this.table[0]);
    this.palette = this.generateColorPalette();
    this.properties = this.table[0][this.columns[0]].elementProperties;
  }

  ngOnInit(): void {
  }

  loadData(): [{[index: string]: Cell}[], string[]] {
    let data: {[index: string]: Cell}[] = [];
    let groups = new Set<string>();

    for (const row of periodic_data) {
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

}
