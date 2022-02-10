import { Component, OnInit } from '@angular/core';
import {Cell, CellComponent} from '../cell/cell.component';
import { periodic_data } from 'src/assets/periodic_grid';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    public myTab: {[index: string]: any}[];

    public myCols: string[];
    // myCols = ["co1", "col2", "col3"];

    constructor() {
      this.myTab = this.loadData();
      this.myCols = Object.keys(this.myTab[0]);
    }

    ngOnInit(): void {
    }

    loadData(): {[index: string]: any}[] {
      let data: {[index: string]: any}[] = [];

      for (const row of periodic_data) {
        let newRow: {[index: string]: any} = {};
        for (const col in row) {
          const { Symbol, Name, AtomicNumber, ...Rest } = row[col];
            newRow[col] = new Cell(Symbol, Name, AtomicNumber, Rest);
        }
        data.push(newRow);
      }

      return data;
    }

}
