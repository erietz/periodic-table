import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    myTab: {[index: string]:any}[] = [
        {
            "col1": "default", 
            "col2": "lkjsdlkjsdflkj", 
            "col3": "0.02",
            "col4": "0.02"
        },
        {
            "col1": "sdfsdf", 
            "col2": "sddf", 
            "col3": "23.34",
            "col4": "23.34",
        },
        {
            "col1": "lklkj", 
            "col2": "kj2", 
            "col3": "0888",
            "col4": "23.34",
        },
        {
            "col1": "what", 
            "col2": "is", 
            "col3": "happening",
            "col4": "23.34",
        },
    ]

    myCols = Object.keys(this.myTab[0]);
    // myCols = ["co1", "col2", "col3"];

    constructor() { }

    ngOnInit(): void {
    }

}
