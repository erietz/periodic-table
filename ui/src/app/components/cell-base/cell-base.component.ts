import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable, BehaviorSubject, of } from "rxjs";

export interface Cell {
  elementSymbol: string;
  elementName: string;
  elementNumber: string;
  elementProperties: {[index: string]: string};
}

export interface CellWithDescription extends Cell {
  elementDescription: string;
}

@Component({
  selector: 'app-cell-base',
  templateUrl: './cell-base.component.html',
  styleUrls: ['./cell-base.component.scss']
})
export class CellBaseComponent {
  @Input() cell: BehaviorSubject<Cell>;
  @Input() backgroundColor: string;

  constructor(
  ) {
    this.cell = new BehaviorSubject<Cell>({
      'elementSymbol': 'elementSymbol',
      'elementName': 'elementName',
      "elementNumber": "elementNumber",
      "elementProperties": {},
    });
    this.backgroundColor = "#007173";
  }

  public onHover() {
  }

  public openDialog() {
  }

}
