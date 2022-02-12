import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell-properties',
  templateUrl: './cell-properties.component.html',
  styleUrls: ['./cell-properties.component.scss']
})
export class CellPropertiesComponent implements OnInit {

  @Input() properties: {[index: string]: string};

  constructor() {
    this.properties = {};
  }

  ngOnInit(): void {
  }

}
