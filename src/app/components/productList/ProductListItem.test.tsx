import { getMockProduct } from '__mocks__/product/getMockProduct'
import { fireEvent } from '@testing-library/react-native'
import { theme } from '@themes/variables/ThemeProvider'
import { getSizedImageForProduct } from '@utils/getSizedImageForProduct'
import { renderWithNavigation } from 'app/testUtils/renderWithNavigation'
import React from 'react'

import { ProductListItem } from './ProductListItem'

const product = getMockProduct()

const mockNavigateFunction = jest.fn()

jest.mock('@react-navigation/core', () => ({
	...jest.requireActual('@react-navigation/core'),
	useNavigation: jest.fn(() => ({
		navigate: mockNavigateFunction,
		goBack: jest.fn()
	}))
}))

describe('ProductListItem - Component Test', () => {
	it('should render correctly', () => {
		const { getByText, getByTestId } = renderWithNavigation(<ProductListItem product={product}></ProductListItem>)

		const listImage = getByTestId('product-list-image')
		expect(listImage.props.source.uri).toBe(getSizedImageForProduct('list', theme.deviceWidth, product))
		expect(getByText('Magnesium-diasporal 400 Extra Kapseln 100 St')).toBeTruthy()
		expect(getByText('100 St')).toBeTruthy()
		expect(getByText('Kapseln')).toBeTruthy()
		expect(getByText('N1')).toBeTruthy()
		expect(getByText('33.96 €')).toBeTruthy()
		expect(getByText('0.34 € | St')).toBeTruthy()
		expect(getByText('Auf Lager')).toBeTruthy()
	})

	it('should render a non-stocked product correctly', () => {
		const { getByText } = renderWithNavigation(
			<ProductListItem product={{ ...product, inStock: false }}></ProductListItem>
		)
		expect(getByText('Magnesium-diasporal 400 Extra Kapseln 100 St')).toBeTruthy()
		expect(getByText('100 St')).toBeTruthy()
		expect(getByText('Kapseln')).toBeTruthy()
		expect(getByText('N1')).toBeTruthy()
		expect(getByText('33.96 €')).toBeTruthy()
		expect(getByText('0.34 € | St')).toBeTruthy()
		expect(getByText('Ausverkauft')).toBeTruthy()
	})

	it('should navigate to PDP on click', () => {
		const { getByTestId } = renderWithNavigation(<ProductListItem product={{ ...product }}></ProductListItem>)
		const productListItem = getByTestId('product-list-item')
		fireEvent.press(productListItem)
		expect(mockNavigateFunction).toBeCalledTimes(1)
	})
})
