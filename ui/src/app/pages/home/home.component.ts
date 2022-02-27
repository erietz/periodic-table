import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tableNames: string[] = [];
  public tableName: string = "Elements";
  public defaultName: string = "Elements";

  constructor() {
  }

  ngOnInit(): void {
    this.getTableNames();
  }

  onSelectorChange(event: any) {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value
    this.tableName = value;
  }

  async getTableNames() {
    const response = await fetch("/api/tablenames")
    const json = await response.json();
    this.tableNames = json;
  }

}
