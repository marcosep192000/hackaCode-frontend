import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGameComponent } from './list-game/list-game.component';
import { AddUpdateGameComponent } from './add-update-game/add-update-game.component';

const routes: Routes = [
  {path: '', component:AddUpdateGameComponent},
  {path: 'list', component: ListGameComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}