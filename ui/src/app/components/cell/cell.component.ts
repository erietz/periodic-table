import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

export interface Cell {
  elementSymbol: string;
  elementName: string;
  elementNumber: string;
  elementProperties: {[index: string]: string};
  elementDescription?: string;
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
    this.cell = {
      'elementSymbol': 'elementSymbol',
      'elementName': 'elementName',
      "elementNumber": "elementNumber",
      "elementProperties": {},
      "elementDescription": ""
    };
    this.backgroundColor = "#3e3e3e";
  }

  onHover() {
    this.displayProperties.emit(this.cell);
  }

  openDialog() {
    fetch("/chem-wiki", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: this.cell.elementName})
    })
      .then(data => data.json())
      .then(json => {

        this.dialog.open(PopupComponent, {
          data: {
            ...this.cell,
            elementDescription: json[this.cell.elementName]
          }
        });
      })
      .catch(err => console.error(err));
  }

}
