import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {CellBaseComponent} from '../cell-base/cell-base.component';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateCellFormComponent } from '../create-cell-form/create-cell-form.component';
import { Cell } from "../cell-base/cell-base.component";

@Component({
  selector: 'app-cell-create',
  templateUrl: '../cell-base/cell-base.component.html',
  styleUrls: ['../cell-base/cell-base.component.scss']
})
export class CellCreateComponent extends CellBaseComponent implements OnInit {
  @Output() groupBlock: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
  }

  public override openDialog(): void {
    const dialogRef = this.dialog.open(
      CreateCellFormComponent,
      { data: this.cell }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result === null || result === undefined) {
        return;
      }
      this.cell.next(this.coerceFormResults(result));
      console.log("coerced data", this.cell);
      this.groupBlock.emit(this.cell.value["elementProperties"]["GroupBlock"]);
    });

  }

  coerceFormResults(result: any): Cell {
    let tmp: Cell = {
      elementName : result.elementName,
      elementSymbol : result.elementSymbol,
      elementNumber : result.elementNumber,
      elementProperties : {}
    };

    for (const prop of result.elementProperties) {
      tmp.elementProperties[prop.name] = prop.description;
    }

    return tmp;
  }

}
