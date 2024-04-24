import { getMockProduct } from '__mocks__/product/getMockProduct'
import { fireEvent } from '@testing-library/react-native'
import { renderWithNavigation } from 'app/testUtils/renderWithNavigation'
import React from 'react'

import ProductDetailScreen from './ProductDetailScreen'

const mockNavigateFunction = jest.fn()

jest.mock('@react-navigation/core', () => ({
	...jest.requireActual('@react-navigation/core'),
	useNavigation: jest.fn(() => ({
		navigate: mockNavigateFunction,
		goBack: jest.fn()
	}))
}))

const mockAddToCartFunction = jest.fn()
const mockCartStore = {
	addToCart: mockAddToCartFunction
}

jest.mock('app/state/StateProvider', () => ({
	useMobx: () => ({ cartStore: mockCartStore })
}))

jest.mock('@react-navigation/bottom-tabs', () => ({
	useBottomTabBarHeight: () => 50
}))

jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: () => ({ top: 10, bottom: 10 })
}))

const mockNavigation = {}
const mockRoute = {
	params: {
		product: getMockProduct()
	}
}

describe('ProductDetailScreen - Component Test', () => {
	beforeEach(() => {
		mockAddToCartFunction.mockClear()
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		const { getByText, getByTestId } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductDetailScreen navigation={mockNavigation as any} route={mockRoute as any}></ProductDetailScreen>
		)

		// TODO: also include icons (just check for 4 icons being present)
		expect(getByTestId('product-detail-image')).toBeTruthy()
		expect(getByText('Magnesium-diasporal 400 Extra Kapseln 100 St')).toBeTruthy()
		expect(getByText('In den Warenkorb')).toBeTruthy()
		expect(getByText('Rezept einlösen')).toBeTruthy()
		expect(getByText('Details')).toBeTruthy()
		expect(getByTestId('product-detail-package-size-icon')).toBeTruthy()
		expect(getByTestId('product-detail-pharmaceutical-icon')).toBeTruthy()
		expect(getByTestId('product-detail-pzn-icon')).toBeTruthy()
		expect(getByTestId('product-detail-company-name-icon')).toBeTruthy()
		expect(getByText('Packungsgröße')).toBeTruthy()
		expect(getByText('100 St')).toBeTruthy()
		expect(getByText('Darreichungsform')).toBeTruthy()
		expect(getByText('Kapseln')).toBeTruthy()
		expect(getByText('PZN')).toBeTruthy()
		expect(getByText('10192609')).toBeTruthy()
		expect(getByText('Hersteller')).toBeTruthy()
		expect(getByText('Protina Pharmazeutische GmbH')).toBeTruthy()
		expect(getByText('Beschreibung')).toBeTruthy()
		expect(getByText('Für deine Muskeln*. Und ganz neue Ziele.')).toBeTruthy()
		expect(getByText(/Mehr anzeigen/)).toBeTruthy()
	})

	it('should have enabled buttons', () => {
		const { getByText } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductDetailScreen
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				navigation={mockNavigation as any}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				route={mockRoute as any}
			></ProductDetailScreen>
		)

		const button = getByText('In den Warenkorb')
		const prescriptionButton = getByText('Rezept einlösen')
		fireEvent.press(button)
		fireEvent.press(prescriptionButton)

		expect(mockAddToCartFunction).toBeCalledTimes(2)
		expect(mockAddToCartFunction).toBeCalledWith(mockRoute.params.product, true)
		expect(mockAddToCartFunction).toBeCalledWith(mockRoute.params.product, false)
	})

	it('should have disabled buttons', () => {
		const mockDisabledRoute = {
			params: {
				product: { ...getMockProduct(), inStock: false }
			}
		}
		const { getByText } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductDetailScreen
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				navigation={mockNavigation as any}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				route={mockDisabledRoute as any}
			></ProductDetailScreen>
		)

		const button = getByText('In den Warenkorb')
		const prescriptionButton = getByText('Rezept einlösen')
		fireEvent.press(button)
		fireEvent.press(prescriptionButton)

		expect(mockAddToCartFunction).not.toBeCalled()
	})

	it('should not show the whole product description', () => {
		const { queryByText } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductDetailScreen
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				navigation={mockNavigation as any}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				route={mockRoute as any}
			></ProductDetailScreen>
		)

		const endOfDescription = queryByText(/Für eine vegane Lebensweise geeignet/)
		expect(endOfDescription).not.toBeTruthy()
	})

	it('should show the whole product description', () => {
		const { getByText, queryByText } = renderWithNavigation(
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			<ProductDetailScreen
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				navigation={mockNavigation as any}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				route={mockRoute as any}
			></ProductDetailScreen>
		)
		const showMore = getByText(/Mehr anzeigen/)
		fireEvent.press(showMore)
		const endOfDescription = queryByText(/Für eine vegane Lebensweise geeignet/)
		expect(endOfDescription).toBeTruthy()
	})
})
