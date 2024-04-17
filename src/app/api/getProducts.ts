import { Product } from '../models/Product'

export const getProducts = (): Product[] => {
	return require('../lib/products.json')
}
