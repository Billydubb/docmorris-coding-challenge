import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import { TabNavigator } from './TabNavigator'

const AppNativeStackNavigator = createNativeStackNavigator()

// eslint-disable-next-line max-lines-per-function
const AppNavigator = (): JSX.Element => {
	return (
		<AppNativeStackNavigator.Navigator
			screenOptions={(): object => ({
				headerShown: false,
				animationTypeForReplace: 'push',
				animationEnabled: false,
				initialRouteName: 'TabNavigator'
			})}
		>
			<AppNativeStackNavigator.Screen name={'TabNavigator'} component={TabNavigator} />
		</AppNativeStackNavigator.Navigator>
	)
}

export default AppNavigator
