import { render } from '@testing-library/react-native'
import React from 'react'

import { ProductListHeaderComponent } from './ProductListHeaderComponent'

describe('ProductListHeaderComponent - Component Test', () => {
	it('should render correctly', () => {
		const { getByText } = render(<ProductListHeaderComponent numResults={40}></ProductListHeaderComponent>)
		expect(getByText('40 Ergebnisse')).toBeTruthy()
	})
})
