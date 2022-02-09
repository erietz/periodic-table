import { Component, OnInit } from '@angular/core';
import {Cell, CellComponent} from '../cell/cell.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    myTab: {[index: string]: Cell}[] = [
        {
            "col1": new Cell('C', 'Carbon', 6),
            "col2": new Cell('H', 'Hydrogen', 1),
            "col3": new Cell('H', 'Hydrogen', 1),
        },
        {
            "col1": new Cell('B', 'Boron', 3),
            "col2": new Cell('T', 'Test', 234),
            "col3": new Cell('H', 'Hydrogen', 1),
        }
    ]

    myCols = Object.keys(this.myTab[0]);
    // myCols = ["co1", "col2", "col3"];

    constructor() { }

    ngOnInit(): void {
    }

}
