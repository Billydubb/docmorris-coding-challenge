import { Product } from 'app/models/Product'
import { makeAutoObservable } from 'mobx'

export interface CartItem {
	quantity: number
	product: Product
	withPrescription: boolean
}

export class CartStore {
	// <string, key is the product code
	prescriptionCartItems: Record<string, CartItem> = {}
	cartItems: Record<string, CartItem> = {}

	constructor() {
		makeAutoObservable(this)
	}

	/**
	 * CartItems to be shown in the prescription segment of the CartScreen
	 */
	get prescriptionCartScreenProducts() {
		const values = Object.values(this.prescriptionCartItems)

		return values
	}

	/**
	 * CartItems to be shown in the non-prescription segment of the CartScreen
	 */
	get cartScreenProducts() {
		const values = Object.values(this.cartItems)

		return values
	}

	get totalPrice() {
		const prescriptionTotal = Object.values(this.prescriptionCartItems).reduce((sum, cartItem) => {
			return cartItem.product.price * cartItem.quantity + sum
		}, 0)

		const cartTotal = Object.values(this.cartItems).reduce((sum, cartItem) => {
			return cartItem.product.price * cartItem.quantity + sum
		}, 0)

		return prescriptionTotal + cartTotal
	}

	get numProductsInCart() {
		const prescriptionTotal = this.prescriptionCartScreenProducts.reduce((sum, cartItem) => {
			return cartItem.quantity + sum
		}, 0)

		const cartTotal = this.cartScreenProducts.reduce((sum, cartItem) => {
			return cartItem.quantity + sum
		}, 0)

		return prescriptionTotal + cartTotal
	}

	addToCart(product: Product, withPrescription: boolean) {
		const oldCartItem = withPrescription ? this.prescriptionCartItems[product.code] : this.cartItems[product.code]

		const cartItemToWriteTo = withPrescription ? this.prescriptionCartItems : this.cartItems
		cartItemToWriteTo[product.code] = {
			quantity: oldCartItem ? oldCartItem.quantity + 1 : 1,
			product,
			withPrescription
		}
	}

	setCartItemQuantity(productCode: string, withPrescription: boolean, quantity: number) {
		const cartItemToWriteTo = withPrescription ? this.prescriptionCartItems : this.cartItems
		// I've limited the purchase of each item to 100
		const newQuantity = Math.max(0, Math.min(100, quantity))

		if (cartItemToWriteTo[productCode]) {
			cartItemToWriteTo[productCode].quantity = newQuantity
		}
	}

	inCrementCartItemQuantity(productCode: string, withPrescription: boolean) {
		const cartItemToWriteTo = withPrescription ? this.prescriptionCartItems : this.cartItems
		const oldQuantity = cartItemToWriteTo[productCode]?.quantity || 0

		this.setCartItemQuantity(productCode, withPrescription, oldQuantity + 1)
	}

	decrementOrDeleteCartItemQuantity(productCode: string, withPrescription: boolean) {
		const cartItemToWriteTo = withPrescription ? this.prescriptionCartItems : this.cartItems
		const oldQuantity = cartItemToWriteTo[productCode]?.quantity || 0

		if (oldQuantity <= 1) {
			delete cartItemToWriteTo[productCode]
			return
		}

		this.setCartItemQuantity(productCode, withPrescription, oldQuantity - 1)
	}
}
