import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateCustomerComponent } from '../customer/create-customer/create-customer.component';
import { ListCustomerComponent } from '../customer/list-customer/list-customer.component';
import { AddCreateTicketComponent } from './add-create-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';


const routes: Routes = [
  { path: 'ticket', component:AddCreateTicketComponent },
  { path: 'list', component: ListTicketComponent},
];

@NgModule({
   declarations: [],
  imports: [ CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class AppRoutingModule { }
