import { Component, Input } from '@angular/core';

export class Cell {
  public elementSymbol: string;
  public elementName: string;
  public elementNumber: number;
  public elementProperties: {[index: string]: string};

  constructor(
    elementSymbol: string,
    elementName: string,
    elementNumber: number,
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

  constructor() {
    this.cell = new Cell('elementSymbol', 'elementName', 0, {});
  }
}
