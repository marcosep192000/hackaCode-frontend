import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CustomerModel } from '../customer-model';
import { CustomerServiceService } from '../customer-service.service';
import { TokenService } from '../../login/token.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginUser } from '../../login/login-user';
import { AuthService } from '../../login/auth.service';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
})
export class ListCustomerComponent implements OnInit, AfterViewInit {
  isLogued = false;
  customer: CustomerModel[] = [];
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'dni',
    'phone',
    'email',
    'birthdate',
    'acciones',
  ];
  dataSource = new MatTableDataSource<CustomerModel>(this.customer);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private customerService: CustomerServiceService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private AuthService: AuthService
  ) {}

  openAddEditCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.all();
        }
      },
    });
  }

  updateCustomer(data: any) {
    this.dialog.open(CreateCustomerComponent, {
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
    this.customerService.all().subscribe((response) => {
      this.dataSource.data = response;
      console.log(response);
    });
  }

  onDelete(id: number) {
    console.log(id);
    this.customerService.delete(id).subscribe({
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
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
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
