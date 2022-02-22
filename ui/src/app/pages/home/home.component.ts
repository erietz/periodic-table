import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public tableNames: string[] = [];
  public tables: any = [];
  public idx: number = 0;

  constructor() {
    this.fetchTables();
  }

  increment() {
    console.log("ingrementing idx");
    this.idx += 1;
  }

  ngOnInit(): void {
  }

  fetchTables() {
    fetch("/api/tables", {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.tables = json;

        const tableNames = [];
        for (const i of json) {
          tableNames.push(i["name"]);
        }
        this.tableNames = tableNames;

      })
      .catch(err => console.error(err));
  }

}
