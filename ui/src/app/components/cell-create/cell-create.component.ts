import { Component, OnInit } from '@angular/core';
import {CellBaseComponent} from '../cell-base/cell-base.component';

@Component({
  selector: 'app-cell-create',
  templateUrl: '../cell-base/cell-base.component.html',
  styleUrls: ['../cell-base/cell-base.component.scss']
})
export class CellCreateComponent extends CellBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
