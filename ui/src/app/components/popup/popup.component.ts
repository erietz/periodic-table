import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cell } from '../cell/cell.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public cell: Cell

  constructor(@Inject(MAT_DIALOG_DATA) public data: Cell) {
    this.cell = data
  }

  ngOnInit(): void {
  }

}
