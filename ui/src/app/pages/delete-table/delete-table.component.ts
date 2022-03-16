import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.scss']
})
export class DeleteTableComponent implements OnInit {

  public tableNames: string[] = [];
  public tableName: string = "";
  public deleteForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.deleteForm = this.fb.group({
      name: this.tableName
    });
  }

  ngOnInit(): void {
    this.getTableNames();
  }

  onSelectorChange(event: any) {
    console.log(event.source.value);
    // const element = event.currentTarget as HTMLInputElement
    const element = event.source;
    const value = element.value
    this.tableName = value;
  }


  deleteTable(): void {
    const confirmation = window.confirm("Are you sure you want to delete this table?");
    if (!confirmation) {
      return;
    }

    fetch(`api/delete/${this.tableName}`, { method: "DELETE" })
      .then(res => res.json())
      .then(json => alert(JSON.stringify(json)))
      .catch(err => console.error(err));

    location.reload();
  }

  async getTableNames(): Promise<void> {
    const response = await fetch("/api/tablenames")
    const json = await response.json();
    this.tableNames = json;
  }

}
