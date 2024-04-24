import { ItemListGroupHeader } from '@components/common/ItemListGroupHeader'
import { theme } from '@themes/variables/ThemeProvider'
import { formatDate } from '@utils/dateUtils'
import { User } from 'app/models/User'
import { Order, ProductOrder } from 'app/state/OrdersStore'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import OrderListProductItem from './OrderListProductItem'

interface Props {
	order: Order
	user?: User
}
export const OrderListItem: FC<Props> = observer(({ order, user }) => {
	const renderOrderListItemProductsProducts = (productOrders: ProductOrder[], withPrescription: boolean) => {
		return (
			<>
				<ItemListGroupHeader
					withPrescription={withPrescription}
					userName={`${user?.firstName} ${user?.lastName}`}
				></ItemListGroupHeader>
				{productOrders.map((productOrder) => {
					return <OrderListProductItem productOrder={productOrder}></OrderListProductItem>
				})}
			</>
		)
	}

	return (
		<View style={styles.orderContainer}>
			<View style={styles.textContainer}>
				<Text style={styles.orderDate}>{formatDate(order.date)}</Text>
				<Text style={styles.orderId}>{`Bestellnummer: ${order.orderId}`}</Text>
				<Text style={styles.orderReceived}>Bestellung eingegangen</Text>
			</View>
			{order.prescriptionProducts.length
				? renderOrderListItemProductsProducts(order.prescriptionProducts, true)
				: null}
			{order.products.length ? renderOrderListItemProductsProducts(order.products, false) : null}
		</View>
	)
})

const styles = StyleSheet.create({
	orderContainer: {
		backgroundColor: theme.colors.white,
		borderRadius: 8,
		paddingVertical: 24,
		paddingHorizontal: 8,
		marginBottom: 24
	},
	textContainer: {
		paddingLeft: 16
	},
	orderDate: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.major.large,
		fontWeight: theme.fontWeight.semiBold,
		fontFamily: theme.fontFamily,
		lineHeight: 27
	},
	orderId: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.common.large,
		fontWeight: theme.fontWeight.medium,
		fontFamily: theme.fontFamily,
		lineHeight: 24,
		marginBottom: 20
	},
	orderReceived: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.major.small,
		fontWeight: theme.fontWeight.semiBold,
		fontFamily: theme.fontFamily,
		lineHeight: 24,
		marginBottom: 28
	}
})
