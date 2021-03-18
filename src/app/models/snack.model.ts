import {IEntity } from '@core/interfaces/services.model';

export interface ISnack extends IEntity<number> {
    name: string;
    count: number;
    price: number;
}
