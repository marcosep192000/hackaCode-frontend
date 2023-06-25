import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerModel } from '../customer-model';
import { CustomerRequestDto } from '../../models/dto/customer-request-dto';
import { CustomerServiceService } from '../customer-service.service';
import { ListCustomerComponent } from '../list-customer/list-customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  formCustomer!: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _snackBar: MatSnackBar,
    private formGrup: FormBuilder,
    private customerService: CustomerServiceService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  initForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      dni: [0, Validators.required],
      phone: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  ngOnInit(): void {
    this.formCustomer = this.initForm();
  }
  customer!: CustomerRequestDto;

  //validaciones de formulario

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'No es un Email Valido' : '';
  }

  create(): void {
    const firstName = this.formCustomer.value.firstName!;
    const lastName = this.formCustomer.value.lastName!;
    const dni = this.formCustomer.value.dni!;
    const email = this.formCustomer.value.email!;
    const phone = this.formCustomer.value.phone!;
    const birthdate = this.formCustomer.value.birthdate!;

    this.customer = new CustomerRequestDto(
      firstName,
      lastName,
      dni,
      email,
      phone,
      birthdate
    );

    this.customerService.save(this.customer).subscribe({
      next: (data) => {
        this._snackBar.open('Cliente creado! ', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        this._snackBar.open(
          'El Cliente ya se encuentra registrado.',
          'cod:91218',
          { duration: 6000, verticalPosition: 'bottom' }
        );
      },
    });
  }
}
