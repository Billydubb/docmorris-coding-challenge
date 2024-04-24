import { createFakeOrders } from '@utils/createFakeOrders'
import { Product } from 'app/models/Product'
import { makeAutoObservable } from 'mobx'

export interface ProductOrder {
	product: Product
	quantity: number
}
export interface Order {
	prescriptionProducts: ProductOrder[]
	products: ProductOrder[]
	orderId: string
	date: Date
}

export class OrdersStore {
	orders: Order[] = []

	constructor() {
		makeAutoObservable(this)
		this.orders = createFakeOrders()
	}

	checkOut(order: Order) {
		// TODO: put theh order to the front of the orders array
		this.orders.unshift(order)
	}
}
