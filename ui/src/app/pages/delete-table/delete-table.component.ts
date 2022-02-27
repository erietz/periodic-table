import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.scss']
})
export class DeleteTableComponent implements OnInit {

  public tableNames: string[] = [];
  public tableName: string = "";

  constructor() { }

  ngOnInit(): void {
    this.getTableNames();
  }


  deleteTable(form: any) {
    const confirmation = window.confirm("Are you sure you want to delete this table?");
    if (!confirmation) {
      return;
    }

    fetch(`api/delete/${form["foo"]}`, { method: "DELETE" })
      .then(res => res.json())
      .then(json => alert(JSON.stringify(json)))
      .catch(err => console.error(err));

  }

  async getTableNames() {
    const response = await fetch("/api/tablenames")
    const json = await response.json();
    this.tableNames = json;
  }

}
