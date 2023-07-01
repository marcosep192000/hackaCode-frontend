import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AddUpdateGameEmployeeComponent } from './add-update-game-employee/add-update-game-employee.component';
import { ListGameEmployeeComponent } from './list-game-employee/list-game-employee.component';

const routes: Routes = [
  {path: '', component:AddUpdateGameEmployeeComponent},
  {path: 'list', component:ListGameEmployeeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameEmployeeRoutingModule  {}