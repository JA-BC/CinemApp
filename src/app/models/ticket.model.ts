import { IEntity } from "@core/interfaces/services.model";
import { IMovie } from "./movie.model";

export interface ITicket extends IEntity<string> {
    movie: IMovie;
    count: number;
    paymentMethod: string;
    order: ITicketOrder[];
}

export interface ITicketOrder {
    name?: string;
    price?: number;
}
