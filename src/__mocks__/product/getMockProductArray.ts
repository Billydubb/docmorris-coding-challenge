import { Product } from '../../app/models/Product'

/**
 * Not really needed since getProducts is the same function, but let's
 * pretend we're fetching the products from an API.
 */
export const getMockProductArray = (): Product[] => {
	return require('./mockProductArray.json')
}
