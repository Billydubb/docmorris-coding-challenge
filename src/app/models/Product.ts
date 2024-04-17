enum ProductMediaType {
	'default' = 'default'
}

interface ProductMediaSize {
	px140: string
	px300: string
	px1000: string
	px120: string
	px240: string
}

enum ProductCategorization {
	'N1' = 'N1',
	'N2' = 'N2',
	'N3' = 'N3'
}

export interface Product {
	mediaGroupImages: { type: ProductMediaType; media: ProductMediaSize }[]
	price: number
	basePrice: string,
	productName: string
	categorization: ProductCategorization
	code: string
	companyName: string
	descriptionAsHtml: string
	pharmaceuticalForm: string
	quantity: string
	inStock: boolean
}
