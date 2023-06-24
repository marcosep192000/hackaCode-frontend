import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerModel } from '../customer-model';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit{
   form! : FormGroup; 
  email = new FormControl('', [Validators.required, Validators.email]);
 
  getErrorMessage() {
   if (this.email.hasError('required')) {
     return 'You must enter a value';
   }
   return this.email.hasError('email') ? 'No es un Email Valido' : '';
 }
  ngOnInit(): void {
  }
   constructor(private dialog: MatDialog, private router:Router, private http:HttpClient ,private fb: FormBuilder){
 }
 }




