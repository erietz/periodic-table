import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Cell, CellWithDescription, CellBaseComponent } from "../cell-base/cell-base.component";

@Component({
  selector: 'app-cell',
  templateUrl: '../cell-base/cell-base.component.html',
  styleUrls: ['../cell-base/cell-base.component.scss']
})
export class CellComponent extends CellBaseComponent {
  @Output() displayProperties: EventEmitter<Cell> = new EventEmitter<Cell>();

  constructor(private dialog: MatDialog) {
    super();
  }

  override onHover() {
    this.displayProperties.emit(this.cell.value);
  }

  override openDialog() {
    fetch("/chem-wiki", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: this.cell.value.elementName})
    })
      .then(data => data.json())
      .then(json => {
        const data: any = {
          ...this.cell,
          elementDescription: json[this.cell.value.elementName],
        }
        this.dialog.open(PopupComponent, { data: data });
      })
      .catch(err => console.error(err));
  }

}
