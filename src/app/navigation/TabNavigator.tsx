import AccountTabBarIconComponent from '@components/AccountTabBarIconComponent'
import { CartTabBarIconComponent } from '@components/cart'
import { TabScreenHeader } from '@components/common/TabScreenHeader'
import TabBarNavigatorIconLabelComponent from '@components/TabBarNavigatorIconLabelComponent'
import CartScreen from '@containers/CartScreen'
import OrdersScreen from '@containers/OrdersScreen'
import Images from '@images'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { theme } from '@themes/variables/ThemeProvider'
import { useMobx } from 'app/state/StateProvider'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { SearchNavigator } from './SearchNavigator'
import { TabNavigatorParamList } from './types'

const BottomTabNavigator = createBottomTabNavigator<TabNavigatorParamList>()

export const TabNavigator = observer((): JSX.Element => {
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
				name={'CartScreen'}
				component={CartScreen}
				options={{
					tabBarLabel: 'Warenkorb',
					tabBarIcon: (): JSX.Element => {
						return <CartTabBarIconComponent />
					},
					headerShown: true,
					header: () => <TabScreenHeader title={'Warenkorb'} />,
					tabBarBadge: cartStore.numProductsInCart || undefined,
					tabBarBadgeStyle: {
						backgroundColor: theme.colors.salem
					},
					tabBarAccessibilityLabel: 'CartTab'
				}}
			/>
			<BottomTabNavigator.Screen
				name={'OrdersScreen'}
				component={OrdersScreen}
				options={{
					tabBarLabel: 'Bestellungen',
					tabBarIcon: (): JSX.Element => {
						return <AccountTabBarIconComponent />
					},
					headerShown: true,
					header: () => <TabScreenHeader title={'Bestellungen'} />,
					tabBarBadgeStyle: {
						backgroundColor: theme.colors.salem
					},
					tabBarAccessibilityLabel: 'OrdersTab'
				}}
			/>
		</BottomTabNavigator.Navigator>
	)
})
