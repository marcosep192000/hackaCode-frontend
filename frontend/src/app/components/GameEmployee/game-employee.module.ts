import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { GameEmployeeRoutingModule } from './game-employee-routing.module';
import { AddUpdateGameEmployeeComponent } from './add-update-game-employee/add-update-game-employee.component';
import { ListGameEmployeeComponent } from './list-game-employee/list-game-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GameRoutingModule } from '../game/game-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddGameComponent } from './add-game/add-game.component';


@NgModule({
  declarations: [
    AddUpdateGameEmployeeComponent,
    ListGameEmployeeComponent,
    AddGameComponent
  ],
  imports: [
    CommonModule,
    GameEmployeeRoutingModule,
    SharedModule,
    GameRoutingModule,
    SharedModule, 
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  
})
export class GameEmployeeModule { }
