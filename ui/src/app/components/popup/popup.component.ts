import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CellWithDescription } from '../cell-base/cell-base.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public cell: CellWithDescription

  constructor(@Inject(MAT_DIALOG_DATA) public data: CellWithDescription) {
    this.cell = data
  }

  ngOnInit(): void {
  }

}
