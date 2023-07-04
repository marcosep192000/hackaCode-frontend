import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCustomerComponent } from '../../customer/create-customer/create-customer.component';
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-add-update-game',
  templateUrl: './add-update-game.component.html',
  styleUrls: ['./add-update-game.component.css'],
})
export class AddUpdateGameComponent {
  formGame!: FormGroup;

  constructor(private _snackBar: MatSnackBar,private gameService: GameService, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateCustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) 
 
 
  {
      this.formGame = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      capacity: [0, [Validators.required]],
      price: [0, Validators.required],
      openHours: this.fb.array([]),
    });
  }


  ngOnInit(): void {
    this.formGame.patchValue(this.data);
  }



  //validaciones de formulario


  get openHours(){
    return this.formGame.controls["openHours"] as FormArray;
  }
  addOpenHours() {
    const formOpenHours = this.fb.group({
      startTime: [0,Validators.required],
      endTime:[0,Validators.required]
    });
    this.openHours.push(formOpenHours)
  }
 deleteOpenHours(i:any )
 {
      this.openHours.removeAt(i);
 }

  


  
  create(): void {
    if (this.formGame.valid) {
    }
    if (this.data) {
      this.gameService.update(this.data.id, this.formGame.value).subscribe({
        next: (dat) => {
          this._snackBar.open('Juego  Actualizado! ', '', {
            duration: 4000,
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this._snackBar.open(
            'El Juego no se puede actualizar.',
            'cod:91218',
            { duration: 6000, verticalPosition: 'bottom' }
          );
        },
      });
    } else {
      this.gameService.save(this.formGame.value).subscribe({
        next: (dat) => {
          this._snackBar.open('Juego creado con exito podras verlo en la list de juegos! ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this._snackBar.open(
            'El juego  ya se encuentra registrado.',
            'cod:91218',
            { duration: 6000, verticalPosition: 'bottom' }
          );
        },
      });
    }
  }
}
