import { Product } from 'app/models/Product'
import { makeAutoObservable } from 'mobx'

export class OrdersStore {
	products: Product[] = []

	constructor() {
		makeAutoObservable(this)
	}
}
