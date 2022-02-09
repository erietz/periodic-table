import { Component, Input } from '@angular/core';

export class Cell {
  public elementSymbol: string;
  public elementName: string;
  public elementNumber: number;

  constructor(elementSymbol: string, elementName: string, elementNumber: number) {
    this.elementSymbol = elementSymbol;
    this.elementName = elementName;
    this.elementNumber = elementNumber;
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
    this.cell = new Cell('elementSymbol', 'elementName', 0);
  }
}
