import { Injectable } from '@angular/core';
import { ISnack } from '../models/snack.model';

@Injectable({ providedIn: 'root' })
export class SnackService {

    private _isHide = true;

    get isHide() {
        return this._isHide;
    }

    model: Partial<ISnack> = { };
    entities = new Array<ISnack>();
    // Keep entites without changes
    shadowEntities = new Array<ISnack>();
    
    constructor() { }
    
    toggle() {
        this._isHide = !this._isHide;
        this.model = {};
    }

    onAdd(model?: ISnack) {
        const item = Object.assign({}, this.model, model);
        item.id = this.entities.length > 0 
                    ? this.entities[this.entities.length - 1].id + 1
                    : 1;

        this.entities.push(item);
        console.log('[SNACK ADDED]', item);
        return Promise.resolve(item);
    }

    onDelete(model: ISnack): Promise<boolean> {
        const index = this.entities.findIndex(snack => snack.id === model.id);

        if (index > -1) {
            console.log('[SNACK DELETED]', this.entities[index]);
            this.entities.splice(index, 1);
            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    }

    saveChanges() {
        this.toggle();
    }

}
