import { Product } from '../../app/models/Product'

export const getMockProduct = (): Product => {
	return require('./mockProduct.json')
}
