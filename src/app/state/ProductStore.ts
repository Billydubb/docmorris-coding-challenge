import { getProducts } from 'app/api/getProducts'
import { Product } from 'app/models/Product'
// Using Fuse.js for fuzzy search for sausage fingers :)
import Fuse from 'fuse.js'
import { makeAutoObservable } from 'mobx'

export class ProductStore {
	products: Product[] = []
	searchTerm = ''
	pageSize = 10
	pageNumber = 0
	fuse: Fuse<Product>

	constructor() {
		makeAutoObservable(this)
		this.fuse = new Fuse(this.products, {
			keys: [
				'productName', // High priority field
				'companyName', // Medium priority field
				'descriptionAsHtml' // Low priority field
			],
			threshold: 0.4,
			includeScore: true
		})
		this.fetchProducts()
	}

	get filteredProducts() {
		if (!this.searchTerm) {
			return this.products
		}

		const results = this.fuse.search(this.searchTerm)

		return results.map((result) => {
			return result.item
		})
	}

	get paginatedProducts() {
		const start = this.pageNumber * this.pageSize
		const end = start + this.pageSize

		return this.filteredProducts.slice(0, end)
	}

	setProducts(products: Product[]) {
		this.products = products
		this.fuse.setCollection(products)
	}

	setSearchTerm(term: string) {
		this.searchTerm = term
		this.pageNumber = 0
	}

	fetchProducts() {
		const response = getProducts()
		this.setProducts(response)
	}

	loadMoreProducts() {
		this.pageNumber += 1
	}

	resetStore() {
		this.products = []
		this.searchTerm = ''
		this.pageNumber = 0
	}
}
