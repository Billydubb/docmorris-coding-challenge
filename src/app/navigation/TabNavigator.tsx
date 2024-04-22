import AccountTabBarIconComponent from '@components/AccountTabBarIconComponent'
import { CartTabBarIconComponent } from '@components/cart'
import { CartScreenHeader } from '@components/cart/CartScreenHeader'
import TabBarNavigatorIconLabelComponent from '@components/TabBarNavigatorIconLabelComponent'
import CartScreen from '@containers/CartScreen'
import Images from '@images'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import { SearchNavigator } from './SearchNavigator'

const BottomTabNavigator = createBottomTabNavigator()

// eslint-disable-next-line max-lines-per-function
export const TabNavigator = (): JSX.Element => {
	const DummyComponent = () => <></>

	return (
		<BottomTabNavigator.Navigator initialRouteName={'SearchNavigator'}>
			<BottomTabNavigator.Screen
				name={'SearchNavigator'}
				component={SearchNavigator}
				options={{
					tabBarLabel: 'Suche',
					tabBarIcon: (): JSX.Element => {
						return <TabBarNavigatorIconLabelComponent icon={Images.icons.assortment} />
					},
					headerShown: false,
					tabBarAccessibilityLabel: 'SearchTab'
				}}
			/>
			<BottomTabNavigator.Screen
				name={'CartNavigator'}
				component={CartScreen}
				options={{
					tabBarLabel: 'Warenkorb',
					tabBarIcon: (): JSX.Element => {
						return <CartTabBarIconComponent />
					},
					headerShown: true,
					header: CartScreenHeader,
					tabBarAccessibilityLabel: 'CartTab'
				}}
			/>
			<BottomTabNavigator.Screen
				name={'OrdersNavigator'}
				component={DummyComponent}
				options={{
					tabBarLabel: 'Bestellungen',
					tabBarIcon: (): JSX.Element => {
						return <AccountTabBarIconComponent />
					},
					headerShown: false,
					tabBarAccessibilityLabel: 'OrdersTab'
				}}
			/>
		</BottomTabNavigator.Navigator>
	)
}
