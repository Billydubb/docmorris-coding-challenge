import AccountTabBarIconComponent from '@components/AccountTabBarIconComponent'
import { CartTabBarIconComponent } from '@components/cart'
import { CartScreenHeader } from '@components/cart/CartScreenHeader'
import TabBarNavigatorIconLabelComponent from '@components/TabBarNavigatorIconLabelComponent'
import CartScreen from '@containers/CartScreen'
import Images from '@images'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from '@themes/variables/ThemeProvider'
import { useMobx } from 'app/state/StateProvider'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { SearchNavigator } from './SearchNavigator'

const BottomTabNavigator = createBottomTabNavigator()

// eslint-disable-next-line max-lines-per-function
export const TabNavigator = observer((): JSX.Element => {
	const DummyComponent = () => <></>
	const { cartStore } = useMobx()

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
					tabBarBadge: cartStore.numProductsInCart || undefined,
					tabBarBadgeStyle: {
						backgroundColor: theme.colors.salem
					},
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
})
