import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleTiket } from '../models/entity/sale-tiket';
import { CustomerModel } from '../customer/customer-model';
import { Game } from '../models/entity/game';
import { GameService } from '../service/game.service';
import { CustomerServiceService } from '../customer/customer-service.service';

@Component({
  selector: 'app-add-create-ticket',
  templateUrl: './add-create-ticket.component.html',
  styleUrls: ['./add-create-ticket.component.css']
})
export class AddCreateTicketComponent implements OnInit {
  gameList!: Game[];
  customerList!: CustomerModel[];
  formulario!: FormGroup; 
  constructor(private formBuilder: FormBuilder, private game: GameService, private customersService: CustomerServiceService) {}
   idCustomer: string =""; 
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [],
      customer: [[], Validators.required],
      game: [[], Validators.required],
      dateTime: [null, Validators.required]
    });
 this.all()
 this.allCustomer()
  }
  public all(): void {
    this.game.all().subscribe((response) => {
     this.gameList = response;
    });
  }
  public allCustomer(): void {
    this.customersService.all().subscribe((response) => {
     this.customerList = response;
    });
  }
  guardar() {
    if (this.formulario.valid) {
      const saleTiket: SaleTiket = this.formulario.value;
       
      console.log(saleTiket);
    }
  }

}
