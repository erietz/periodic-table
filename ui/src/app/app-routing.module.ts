import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTableComponent } from './pages/create-table/create-table.component';
import { HomeComponent } from './pages/home/home.component';
import { DeleteTableComponent } from "./pages/delete-table/delete-table.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateTableComponent },
  { path: 'delete', component: DeleteTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
