import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { NavigationComponent } from './components/dashboard/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';
import { NoAuthGuard } from './components/guards/no-auth.guard';
import { AuthGuard } from './components/guards/auth.guard';
import { TokenService } from './components/login/token.service';
import { Token } from '@angular/compiler';
import { HasRoleGuard } from './components/guards/guards/has-role.guard';


          



const routes: Routes = [
 
 
   

 
  { path: 'login', component:LoginComponent ,canActivate:[NoAuthGuard]},

  { path: 'dashboard',component: NavigationComponent,children: [{path: 'customer', loadChildren: () => import('./components/customer/customer.module').then(m => m.CustomerModule)}] ,
   //canActivate:[AuthGuard],
   canLoad:[HasRoleGuard],
   data:{
   allowedRoles:['ADMIN']
   }
  },

  { path: 'dashboard',component: NavigationComponent,children: [{path: 'game', loadChildren: () => import('./components/game/game.module').then(w => w.GameModule)}],
 
  canLoad:[HasRoleGuard],
  data:{
  allowedRoles:['ADMIN']
  }
},

 { path: 'dashboard',component: NavigationComponent,children: [{path: 'gameEmployee', loadChildren: () => import('./components/GameEmployee/game-employee.module').then(j => j.GameEmployeeModule)}],
 canLoad:[HasRoleGuard],
 data:{
 allowedRoles:['EMPLOYEE']
 }
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
