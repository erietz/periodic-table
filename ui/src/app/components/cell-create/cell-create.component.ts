import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {CellBaseComponent} from '../cell-base/cell-base.component';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateCellFormComponent } from '../create-cell-form/create-cell-form.component';

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
      this.cell = result;
      this.groupBlock.emit(result["GroupBlock"]);
    });

  }

}
