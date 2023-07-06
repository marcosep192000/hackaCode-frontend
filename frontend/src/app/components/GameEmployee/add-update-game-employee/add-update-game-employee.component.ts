import { Component, Inject } from '@angular/core';
import { GameEmployee } from '../../models/entity/game-employee';
import { GameEmployeeService } from '../../service/game-employee.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { LoginUser } from '../../login/login-user';
import { GameService } from '../../service/game.service';
import { Game } from '../../models/entity/game';
import { CustomerModel } from '../../customer/customer-model';

@Component({
  selector: 'app-add-update-game-employee',
  templateUrl: './add-update-game-employee.component.html',
  styleUrls: ['./add-update-game-employee.component.css'],
})
export class AddUpdateGameEmployeeComponent {
  colorControl = new FormControl('primary' as ThemePalette);
  formGameEmployeee!: FormGroup;
  GameEmployee: GameEmployee[] = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  gameList!: Game[];


  mostrarInput = false; 
  constructor(
    private _snackBar: MatSnackBar,
    private gameEmployeeService: GameEmployeeService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUpdateGameEmployeeComponent>,
    private game: GameService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.formGameEmployeee = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      role : ['EMPLOYEE', [Validators.required]],
      dni: [0, Validators.required],
      email: ['', Validators.email],
      game: [],
      workingHours: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  this.formGameEmployeee.patchValue(this.data);
  this.all();

  }
  public all(): void {
    this.game.all().subscribe((response) => {
     this.gameList = response;
    });

  }



  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'No es un Email Valido' : '';
  }

  create(): void {
      if (this.data) {
        this.gameEmployeeService.update(this.data.id, this.formGameEmployeee.value)
          .subscribe({
            next: (dat) => {
              this._snackBar.open('Cliente Actualizado! ', '', {
                duration: 4000,
                verticalPosition: 'top',
              });
              this.dialogRef.close(true);
            },
            error: (err) => {
              this._snackBar.open(
                'El encargado de juego no se encuentra registrado.',
                'cod:91218',
                { duration: 6000, verticalPosition: 'bottom' }
              );
            },
          });
      } else {
        this.gameEmployeeService.save(this.formGameEmployeee.value).subscribe({
          next: (dat) => {
            this._snackBar.open('Cliente creado! ', '', {
              duration: 3000,
              verticalPosition: 'top',
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            this._snackBar.open(
              'El Cliente no se pude registrar .' + err,
              'cod:91218',
              { duration: 6000, verticalPosition: 'bottom' }
            );
          },
        });
      }
    
  }
}
