import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCreateTicketComponent } from './add-create-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AddCreateTicketComponent,
    ListTicketComponent,
    
  ],
  imports: [
    CommonModule,
    
  
 
    FormsModule,
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
    AppRoutingModule,
  ]
})
export class SaleTicketsModule { }
