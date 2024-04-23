import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'

import LoadingButton from './LoadingButton'

describe('LoadingButton - Component Test', () => {
	it('should render and display kaufen', () => {
		const mockFunction = jest.fn()
		const { getByText } = render(<LoadingButton title={'Kaufen'} onPress={mockFunction}></LoadingButton>)
		expect(getByText('Kaufen')).toBeTruthy()
	})

	it('should be disabled', () => {
		const mockFunction = jest.fn()
		const { getByText } = render(<LoadingButton disabled title={'Kaufen'} onPress={mockFunction}></LoadingButton>)
		const button = getByText('Kaufen')
		fireEvent.press(button)
		expect(mockFunction).not.toBeCalled()
	})

	it('should be enabled', () => {
		const mockFunction = jest.fn()
		render(<LoadingButton title={'Kaufen'} onPress={mockFunction}></LoadingButton>)
		const { getByTestId } = render(<LoadingButton title={'Kaufen'} onPress={mockFunction}></LoadingButton>)
		const button = getByTestId('loading-button')
		fireEvent.press(button)
		expect(mockFunction).toBeCalledTimes(1)
	})
})
