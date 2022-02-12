import { Component, OnInit } from '@angular/core';
import {Cell, CellComponent} from '../cell/cell.component';
import { periodic_data } from 'src/assets/periodic_grid';
import { COLOR_PALETTE } from 'src/assets/color_palette';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    public myTab: {[index: string]: any}[];
    public myCols: string[];
    public groups: string[];
    public palette: {[index: string]: string};

    constructor() {
      [this.myTab, this.groups] = this.loadData();
      this.myCols = Object.keys(this.myTab[0]);
      this.palette = this.generateColorPalette();
    }

    ngOnInit(): void {
    }

    loadData(): [{[index: string]: any}[], string[]] {
      let data: {[index: string]: any}[] = [];
      let groups = new Set<string>();

      for (const row of periodic_data) {
        let newRow: {[index: string]: any} = {};
        for (const col in row) {

          const d = row[col];

          newRow[col] = new Cell(d['Symbol'], d['Name'], d['AtomicNumber'], d);

          if (d['GroupBlock'] != null && !groups.has(d['GroupBlock'])) {
            groups.add(d['GroupBlock']);
          }

        }
        data.push(newRow);
      }

      return [data, Array.from(groups)];
    }

    generateColorPalette(): {[index: string]: string} {
      const tmpPalette: {[index: string]: string} = {};

      for (let i=0; i<COLOR_PALETTE.length; i++) {
        if (this.groups[i] != null) {
          tmpPalette[this.groups[i]] = COLOR_PALETTE[i];
          console.log(this.groups[i], COLOR_PALETTE[i]);
          console.log(tmpPalette[this.groups[i]]);
        }
      }

      return tmpPalette;
    }
}
