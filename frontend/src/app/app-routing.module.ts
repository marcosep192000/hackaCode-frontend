import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { NoAuthGuard } from './components/guards/no-auth.guard';
import { AuthGuard } from './components/guards/auth.guard';
import { TokenService } from './components/login/token.service';
import { Token } from '@angular/compiler';
import { HasRoleGuard } from './components/guards/guards/has-role.guard';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', component:LandingComponent },
 
  { path: 'login', component:LoginComponent ,canActivate:[NoAuthGuard]},

  { path: 'dashboard',component: NavigationComponent,children: [{path: 'customer',  canActivate:[HasRoleGuard], canLoad:[HasRoleGuard], data:{role:['ADMIN'],}, loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule)}]},

  { path: 'dashboard',component: NavigationComponent,children: [{path: 'game',   canActivate:[HasRoleGuard], canLoad:[HasRoleGuard],data:{role:['ADMIN'],},loadChildren: () => import('./components/game/game.module').then(w => w.GameModule)}],},

 { path: 'dashboard',component: NavigationComponent,children: [{path: 'gameEmployee', canActivate:[HasRoleGuard], canLoad:[HasRoleGuard], data:{role:['ADMIN']}, loadChildren: () => import('./components/GameEmployee/game-employee.module').then(j => j.GameEmployeeModule)}],}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
