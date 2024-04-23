/**
 * This file contains all the type definition for all the Navigators and Screens
 *
 * It shows the whole Navigation structure of the app
 */

import { CartScreenParamsList } from '@containers/CartScreen'
import { OrdersScreenParamsList } from '@containers/OrdersScreen'
import { ProductDetailScreenParamList } from '@containers/ProductDetailScreen'
import { ProductListScreenParamList } from '@containers/ProductListScreen'

import { NavigatorScreenParamList } from './NavigatorHelper'

export type AppNavigatorParamList = {
	TabNavigator: NavigatorScreenParamList<TabNavigatorParamList>
}

export type TabNavigatorParamList = {
	SearchNavigator: NavigatorScreenParamList<SearchNavigatorParamList>
	CartScreen: CartScreenParamsList
	OrdersScreen: OrdersScreenParamsList
}

export type SearchNavigatorParamList = {
	ProductListScreen: ProductListScreenParamList
	ProductDetailScreen: ProductDetailScreenParamList
}
