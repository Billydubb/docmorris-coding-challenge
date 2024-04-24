import { OrderListItem } from '@components/orders/OrderListItem'
import { ScreenParamList, TabNavigatorParamList } from '@navigation/types'
import { BottomTabScreenProps, useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { theme } from '@themes/variables/ThemeProvider'
import { useMobx } from 'app/state/StateProvider'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type OrdersScreenParamsList = ScreenParamList<'OrdersScreen'>
type OrdersScreenProps = BottomTabScreenProps<TabNavigatorParamList, 'OrdersScreen'>

const OrdersScreen: FC<OrdersScreenProps> = observer(() => {
	const tabBarHeight = useBottomTabBarHeight()
	const insets = useSafeAreaInsets()
	const { ordersStore, userStore } = useMobx()

	return (
		<View style={styles.container}>
			<FlatList
				data={ordersStore.lastTenOrders}
				keyExtractor={(item) => item.orderId}
				renderItem={({ item }) => <OrderListItem order={item} user={userStore.user}></OrderListItem>}
				contentContainerStyle={[styles.contentContainer, { paddingBottom: tabBarHeight + insets.bottom }]}
			/>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.colors.grey7,
		padding: 24
	},
	contentContainer: {}
})

export default OrdersScreen
