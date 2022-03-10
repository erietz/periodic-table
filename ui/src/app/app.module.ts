import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { CellComponent } from './components/cell/cell.component';
import { CellPropertiesComponent } from './components/cell-properties/cell-properties.component';
import { LegendComponent } from './components/legend/legend.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './components/popup/popup.component';
import { CreateTableComponent } from './pages/create-table/create-table.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DeleteTableComponent } from './pages/delete-table/delete-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCellFormComponent } from './components/create-cell-form/create-cell-form.component';
import { CellBaseComponent } from './components/cell-base/cell-base.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CellComponent,
    CellPropertiesComponent,
    LegendComponent,
    PopupComponent,
    CreateTableComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    DeleteTableComponent,
    CreateCellFormComponent,
    CellBaseComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
