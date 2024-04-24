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

	get lastTenOrders() {
		const lastTen = this.orders.slice(0, 10)

		return lastTen
	}

	checkOut(order: Order) {
		this.orders.unshift(order)
	}
}
