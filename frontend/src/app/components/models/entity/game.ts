export interface Game {
    id?:number,
    name: string,
    capacity : number,
    price: number,
}
export interface GameCreate {
    id?:number,
    name: string,
    capacity : number,
    openHours:[],
    price: number,
}




