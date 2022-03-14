import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tableNames: string[] = [];
  public tableName: string = "Elements";
  public defaultName: string = "Elements";
  public tableForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.tableForm = this.fb.group({
      name: this.defaultName
    });
  }

  ngOnInit(): void {
    this.getTableNames();
  }

  onSelectorChange(event: any) {
    // console.log(event.source);
    // const element = event.currentTarget as HTMLInputElement
    const element = event.source;
    const value = element.value
    this.tableName = value;
  }

  async getTableNames() {
    const response = await fetch("/api/tablenames")
    const json = await response.json();
    this.tableNames = json;
  }

}
