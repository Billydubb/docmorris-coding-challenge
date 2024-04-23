import { Product } from 'app/models/Product'
import { PixelRatio } from 'react-native'

export type ScreenType = 'list' | 'detail' | 'cart'

/**
 * Selects the image size from the products object based on the screen type,
 * device dimensions and pixed density
 */
export const getSizedImageForProduct = (screenType: ScreenType, deviceWidth: number, product: Product): string => {
	const pixelDensity = PixelRatio.get() // Get pixel density ratio

	switch (screenType) {
		case 'list':
			if (deviceWidth < 500 && pixelDensity < 2) {
				return product.mediaGroupImages[0].media.px140
			} else if (deviceWidth < 500 && pixelDensity >= 2) {
				return product.mediaGroupImages[0].media.px240
			} else if (deviceWidth >= 500) {
				return product.mediaGroupImages[0].media.px240
			}

			break

		case 'detail':
			if (deviceWidth < 500) {
				return pixelDensity < 2
					? product.mediaGroupImages[0].media.px300
					: product.mediaGroupImages[0].media.px1000
			} else {
				return product.mediaGroupImages[0].media.px1000
			}

			break

		case 'cart':
			if (deviceWidth < 500 && pixelDensity < 2) {
				return product.mediaGroupImages[0].media.px240
			} else {
				return product.mediaGroupImages[0].media.px300
			}

			break

		default:
			return product.mediaGroupImages[0].media.px240
	}

	return product.mediaGroupImages[0].media.px240
}
