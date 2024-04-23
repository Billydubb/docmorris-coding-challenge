import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'
import React, { ReactElement } from 'react'

export const renderWithNavigation = (component: ReactElement) => {
	return render(<NavigationContainer>{component}</NavigationContainer>)
}
