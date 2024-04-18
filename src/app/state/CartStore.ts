import { Product } from 'app/models/Product';
import { makeAutoObservable } from 'mobx';

export class CartStore {
    products: Product[] = []

    constructor() {
        makeAutoObservable(this);
    }
}

export const cartStore = new CartStore();

