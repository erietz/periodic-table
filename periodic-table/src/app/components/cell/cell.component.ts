import { Component, Input } from '@angular/core';

export class Cell {
  public elementSymbol: string;
  public elementName: string;
  public elementNumber: string;
  public elementProperties: {[index: string]: string};

  constructor(
    elementSymbol: string,
    elementName: string,
    elementNumber: string,
    elementProperties: {[index: string]: string},
  ) {
    this.elementSymbol = elementSymbol;
    this.elementName = elementName;
    this.elementNumber = elementNumber;
    this.elementProperties = elementProperties;
  }
}

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell: Cell;
  @Input() foo: string;

  constructor() {
    this.cell = new Cell('elementSymbol', 'elementName', "elementNumber", {});
    this.foo = "#3e3e3e";
  }
}
