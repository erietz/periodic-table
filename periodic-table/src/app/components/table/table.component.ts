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
        for (const col in row) {
          const symbol = String(col["Name"]);
          const atomName = String(col["Name"]);
          const number = parseInt(col["AtomicNumber"]);
          data.push({col: new Cell(symbol, atomName, number)});
        }
      }

      return data;
    }

}
