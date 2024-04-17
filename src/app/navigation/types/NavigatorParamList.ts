/**
 * This file contains all the type definition for all the Navigators and Screens
 *
 * It shows the whole Navigation structure of the app
 */

import { ProductListScreenParamList } from '@containers/ProductListScreen'

import { NavigatorScreenParamList } from './NavigatorHelper'

export type AppNavigatorParamList = {
	TabNavigator: NavigatorScreenParamList<TabNavigatorParamList>
}

export type TabNavigatorParamList = {
	SearchNavigator: NavigatorScreenParamList<SearchNavigatorParamList>
}

export type SearchNavigatorParamList = {
	ProductListScreen: ProductListScreenParamList
}
