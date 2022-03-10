import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-cell-form',
  templateUrl: './create-cell-form.component.html',
  styleUrls: ['./create-cell-form.component.scss']
})
export class CreateCellFormComponent implements OnInit {
  public foo: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.foo = data;
  }

  ngOnInit(): void {
  }

}
