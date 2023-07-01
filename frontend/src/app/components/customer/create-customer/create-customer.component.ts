

import { AfterViewInit, Component,Inject,OnInit, ViewChild, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CustomerServiceService } from '../customer-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerModel } from '../customer-model';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css'],
})
export class CreateCustomerComponent implements OnInit {
  formCustomer!: FormGroup;
  customer: CustomerModel[]=[]
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _snackBar: MatSnackBar,
    private customerService: CustomerServiceService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateCustomerComponent>,
     
   @Inject(MAT_DIALOG_DATA) public data : any,
    ) {

    this.formCustomer = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      dni: [0, Validators.required],
      phone: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  ngOnInit(): void {

    this.formCustomer.patchValue(this.data); 
  }

  //validaciones de formulario

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'No es un Email Valido' : '';
  }

  create(): void {
   if (this.formCustomer.valid){



   }
   if (this.data){

    this.customerService.update(this.data.id,this.formCustomer.value).subscribe({
      next: (dat) => {
        this._snackBar.open('Cliente Actualizado! ', '', {
          duration: 4000,
          verticalPosition: 'top',
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this._snackBar.open(
          'El Cliente ya se encuentra registrado.',
          'cod:91218',
          { duration: 6000, verticalPosition: 'bottom' }
        );
      },
    });
 
   }else {

    this.customerService.save(this.formCustomer.value).subscribe({
      next: (dat) => {
        this._snackBar.open('Cliente creado! ', '', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.dialogRef.close(true);
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
}

