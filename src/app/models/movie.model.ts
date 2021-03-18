import { IEntity } from "@core/interfaces/services.model";

export interface IMovie extends IEntity<string> {
    name: string;
    schedule: string;
    price: number;
    imgURL: string;
}
