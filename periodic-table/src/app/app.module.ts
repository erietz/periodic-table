import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { CellComponent } from './components/cell/cell.component';
import { CellPropertiesComponent } from './components/cell-properties/cell-properties.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CellComponent,
    CellPropertiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
