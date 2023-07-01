import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { GameEmployee } from './components/models/entity/game-employee';
import { Game } from './components/models/entity/game';
import { GameEmployeeModule } from './components/GameEmployee/game-employee.module';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'dashboard',component: NavigationComponent,children: [{path: 'customer', loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule)}]},
  { path: 'dashboard',component: NavigationComponent,children: [{path: 'game', loadChildren: () => import('./components/game/game.module').then(w => w.GameModule)}]},
 { path: 'dashboard',component: NavigationComponent,children: [{path: 'gameEmployee', loadChildren: () => import('./components/GameEmployee/game-employee.module').then(j => j.GameEmployeeModule)}]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
