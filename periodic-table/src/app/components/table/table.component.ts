import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    tableArray = [
        {
            row1: "test1",
            row2: "test1",
            row3: "test1",
        },
        {
            row1: "test2",
            row2: "test2",
            row3: "test2",
        },
        {
            row1: "test3",
            row2: "test3",
            row3: "test3",
        },
    ]

    constructor() { }

    ngOnInit(): void {
    }

}
