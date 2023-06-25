import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerModel } from '../customer-model';
import { CustomerServiceService } from '../customer-service.service';
import { TokenService } from '../../login/token.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
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
  dialogRef: any;
  constructor(
    private customerService: CustomerServiceService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    private router: Router
  ) {}

  openAddEditCustomer() {
    this.dialog.open(CreateCustomerComponent);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
