import { getProducts } from 'app/api/getProducts';
import { Product } from 'app/models/Product';
import { makeAutoObservable } from 'mobx';

export class ProductStore {
    products: Product[] = []
    searchTerm = '';
    pageSize = 10;
    pageNumber = 0;

    constructor() {
        makeAutoObservable(this);
        this.fetchProducts()
    }

    setProducts(products: Product[]) {
        this.products = products;
    }

    setSearchTerm(term: string) {
        this.searchTerm = term;
        this.pageNumber = 0;
    }

    fetchProducts() {    
        const response = getProducts();
        this.setProducts(response);
    }

    // get filteredProducts() {
    //     const start = this.pageNumber * this.pageSize;
    //     const end = start + this.pageSize;
    //     console.log("start: ", start)
    //     console.log("end: ", end)
    //     const filteredProducts = this.products
    //       .filter(product =>
    //         product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
    //       )
    //       .slice(start, end);

    //     console.log("FILTERED PRODUCTS", filteredProducts.length)
    //     return filteredProducts
    // }

    get filteredProducts() {
        const start = this.pageNumber * this.pageSize;
        const end = start + this.pageSize;
        console.log("start: ", start)
        console.log("end: ", end)

        const filteredProducts = this.products.slice(0,end)
        console.log(filteredProducts.length)
        return filteredProducts
    }

    loadMoreProducts() {
        this.pageNumber += 1;
    }

    resetStore() {
        this.products = [];
        this.searchTerm = '';
        this.pageNumber = 0;
    }
}

export const productStore = new ProductStore();

