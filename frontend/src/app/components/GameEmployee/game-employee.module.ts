import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GameEmployeeRoutingModule } from './game-employee-routing.module';
import { AddUpdateGameEmployeeComponent } from './add-update-game-employee/add-update-game-employee.component';
import { ListGameEmployeeComponent } from './list-game-employee/list-game-employee.component';



@NgModule({
  declarations: [
    AddUpdateGameEmployeeComponent,
    ListGameEmployeeComponent
  ],
  imports: [
    CommonModule,
    GameEmployeeRoutingModule,
    SharedModule
  ]
})
export class GameEmployeeModule { }
