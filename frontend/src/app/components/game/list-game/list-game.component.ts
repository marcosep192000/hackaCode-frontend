import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { TokenService } from '../../login/token.service';
import { Game } from '../../models/entity/game';
import { GameService } from '../../service/game.service';
import { AddUpdateGameComponent } from '../add-update-game/add-update-game.component';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.css']
})
export class ListGameComponent implements OnInit{
  [x: string]: any;
  isLogued = false;
  game: Game[] = [];
  displayedColumns: string[] = ["id","name","capacity","price","acciones"];
  dataSource = new MatTableDataSource<Game>(this.game);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private gameService: GameService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openAddEditCustomer() {
    const dialogRef = this.dialog.open(AddUpdateGameComponent,{
     maxWidth:'600px', 
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

  updateCustomer(data: any) {
    this.dialog.open(AddUpdateGameComponent, {
      
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
    this.gameService.all().subscribe((response) => {
      this.dataSource.data = response;
      console.log(response);
    });
  }

  onDelete(id: number) {
    console.log(id);
    this.gameService.delete(id).subscribe({
      next: (res) => {
        this._snackBar.open(
          'El Cliente ya se encuentra registrado.',
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
    const dialogRef = this.dialog.open(AddUpdateGameComponent, {
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
