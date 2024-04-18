import { Product } from 'app/models/Product';
import { makeAutoObservable } from 'mobx';

export class ProductStore {
    products: Product[] = []

    constructor() {
        makeAutoObservable(this);
    }
}

export const productStore = new ProductStore();

