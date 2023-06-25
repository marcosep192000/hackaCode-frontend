export class CustomerRequestDto {
  firstName!: string;
  lastName!: string;
  dni!: number;
  email!:string;
  phone!: string;
  birthdate!: string;

  constructor( firstName:string, lastName: string,  dni:number,  email: string,  phone: string,  birthdate: string )
  {  
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.email = email;
    this.phone = phone;
    this.birthdate = birthdate;
  }
}
