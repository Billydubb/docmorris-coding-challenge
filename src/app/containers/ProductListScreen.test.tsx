import { getMockProductArray } from '__mocks__/product/getMockProductArray'
import { fireEvent, waitFor } from '@testing-library/react-native'
import { ProductStore } from 'app/state/ProductStore'
import { renderWithNavigation } from 'app/testUtils/renderWithNavigation'
import React from 'react'

import ProductListScreen from './ProductListScreen'

const mockNavigateFunction = jest.fn()

jest.mock('@react-navigation/core', () => ({
	...jest.requireActual('@react-navigation/core'),
	useNavigation: jest.fn(() => ({
		navigate: mockNavigateFunction,
		goBack: jest.fn()
	}))
}))

const spyMock = jest.spyOn(ProductStore.prototype, 'fetchProducts').mockImplementation(function (this: ProductStore) {
	const products = getMockProductArray()
	this.products = products
})

const mockProductStore = new ProductStore()
mockProductStore.pageSize = 2

jest.mock('app/state/StateProvider', () => ({
	useMobx: () => ({ productStore: mockProductStore })
}))

// Mock other external dependencies
jest.mock('@react-navigation/bottom-tabs', () => ({
	useBottomTabBarHeight: () => 50
}))

jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: () => ({ top: 10, bottom: 10 })
}))

const mockNavigation = {}
const mockRoute = {}

describe('ProductListScreen - Component Test', () => {
	beforeEach(() => {
		const mockProductStore = new ProductStore()
		mockProductStore.pageSize = 2
		jest.mock('app/state/StateProvider', () => ({
			useMobx: () => ({ productStore: mockProductStore })
		}))
	})

	afterAll(() => {
		spyMock.mockClear()
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		const { getByText, getByPlaceholderText } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any}></ProductListScreen>
		)
		expect(getByPlaceholderText('Suche')).toBeTruthy()
		expect(getByText('4 Ergebnisse')).toBeTruthy()
		expect(getByText('Magnesium-diasporal 400 Extra Kapseln 100 St')).toBeTruthy()
		expect(getByText('Ensbona Teufelssalbe Heiß 200 ml')).toBeTruthy()
	})

	it('should load more products', async () => {
		const { getByTestId } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any}></ProductListScreen>
		)

		const flatList = getByTestId('product-list-flatlist')
		const initialNumberOfProducts = flatList.props.data.length

		fireEvent(flatList, 'onEndReached')

		const numberOfProductsAfterLoad = flatList.props.data.length

		expect(mockProductStore.pageSize).toBe(2)
		await waitFor(() => {
			expect(numberOfProductsAfterLoad).toBeGreaterThan(initialNumberOfProducts)
		})
	})

	it('should set the search term in the search field and products store when text is entered', () => {
		const { getByPlaceholderText } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any}></ProductListScreen>
		)

		const searchField = getByPlaceholderText('Suche')
		fireEvent.changeText(searchField, 'Magnesium')
		expect(searchField.props.value).toBe('Magnesium')
	})

	fit('should navigate to PDP on click', () => {
		const { getAllByTestId } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductListScreen navigation={mockNavigation as any} route={mockRoute as any}></ProductListScreen>
		)
		const productListItem = getAllByTestId('product-list-item')[0]
		fireEvent.press(productListItem)
		expect(mockNavigateFunction).toBeCalledTimes(1)
	})
})
