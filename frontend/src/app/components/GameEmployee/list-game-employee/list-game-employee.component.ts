import { Component, Inject, ViewChild } from '@angular/core';
import { GameEmployee } from '../../models/entity/game-employee';
import { GameEmployeeService } from '../../service/game-employee.service';
import { AddUpdateGameEmployeeComponent } from '../add-update-game-employee/add-update-game-employee.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TokenService } from '../../login/token.service';

@Component({
  selector: 'app-list-game-employee',
  templateUrl: './list-game-employee.component.html',
  styleUrls: ['./list-game-employee.component.css']
})
export class ListGameEmployeeComponent {
  isLogued = false;
  gameEmployee: GameEmployee[] = [];
  displayedColumns: string[] = [
    
    'lastName',
    'firstName',
    'dni',
    'email',
    'workingHours',
    'acciones',
  ];
  dataSource = new MatTableDataSource<GameEmployee>(this.gameEmployee);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private GameEmployeeService: GameEmployeeService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openAddEditGameEmployee() {
    const dialogRef = this.dialog.open(AddUpdateGameEmployeeComponent,{
      maxWidth:'500px', 
     width:'600px', 
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.all();
        }
      },
    });
  }

  updateGameEmployee(data: any) {
    this.dialog.open(AddUpdateGameEmployeeComponent, {
      data,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


  }

  ngOnInit(): void {
    this.all();
    if (this.tokenService.getToken()) {
      this.isLogued = true;
    } else {
      this.isLogued = false;
      this.router.navigate(['']);
    }
    
  }

  public all(): void {
    this.GameEmployeeService.all().subscribe((response) => {
      this.dataSource.data = response;
      console.log(response);
    });

    console.log(this.tokenService.getRole() +"llllllll")
  }

  onDelete(id: number) {
    console.log(id);
    this.GameEmployeeService.delete(id).subscribe({
      next: (res) => {
        this._snackBar.open(
          'El Encargado de juegos se ha eliminado.',
          'cod:91218',
          { duration: 6000, verticalPosition: 'bottom' }
        );
        this.all();
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdate(data: any) {
    const dialogRef = this.dialog.open(AddUpdateGameEmployeeComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.all();
        }
      },
    });
  }
}
