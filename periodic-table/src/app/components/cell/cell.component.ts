import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

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
  @Input() backgroundColor: string;
  @Output() displayProperties: EventEmitter<Cell> = new EventEmitter<Cell>();

  constructor(private dialog: MatDialog) {
    this.cell = new Cell('elementSymbol', 'elementName', "elementNumber", {});
    this.backgroundColor = "#3e3e3e";
  }

  onHover() {
    this.displayProperties.emit(this.cell);
  }

  openDialog() {
    this.dialog.open(PopupComponent, {
      data: {
        tmpData: "This popup will display data for an element obtained from" +
        " a teammates microservice"
      }
    });
  }

}
