import { getProducts } from 'app/api/getProducts'
import { Order } from 'app/state/OrdersStore'

import { getXDaysAgo } from './dateUtils'
import { generateOrderId } from './generateOrderId'

/**
 * This is a helper function to create Fake orders with dates in the past to populate the OrdersStore
 * so that these can be visualized to show off the OrdersScreen
 */
export const createFakeOrders = () => {
	const products = getProducts().slice(0, 15)

	const orders: Order[] = [
		{
			prescriptionProducts: [
				{
					product: products[0],
					quantity: 2
				},
				{
					product: products[1],
					quantity: 3
				}
			],
			products: [
				{
					product: products[2],
					quantity: 1
				},
				{
					product: products[3],
					quantity: 4
				}
			],
			orderId: generateOrderId(),
			date: getXDaysAgo(1)
		},
		{
			prescriptionProducts: [
				{
					product: products[4],
					quantity: 3
				},
				{
					product: products[5],
					quantity: 1
				}
			],
			products: [
				{
					product: products[6],
					quantity: 4
				},
				{
					product: products[7],
					quantity: 4
				}
			],
			orderId: generateOrderId(),
			date: getXDaysAgo(3)
		},
		{
			prescriptionProducts: [
				{
					product: products[8],
					quantity: 1
				}
			],
			products: [
				{
					product: products[9],
					quantity: 2
				}
			],
			orderId: generateOrderId(),
			date: getXDaysAgo(4)
		},
		{
			prescriptionProducts: [
				{
					product: products[10],
					quantity: 1
				},
				{
					product: products[11],
					quantity: 1
				}
			],
			products: [
				{
					product: products[12],
					quantity: 2
				},
				{
					product: products[13],
					quantity: 2
				}
			],
			orderId: generateOrderId(),
			date: getXDaysAgo(15)
		},
		{
			prescriptionProducts: [
				{
					product: products[14],
					quantity: 1
				}
			],
			products: [],
			orderId: generateOrderId(),
			date: getXDaysAgo(17)
		}
	]

	return orders
}
