import { theme } from '@themes/variables/ThemeProvider'
import { getSizedImageForProduct } from '@utils/getSizedImageForProduct'
import { ProductOrder } from 'app/state/OrdersStore'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
	productOrder: ProductOrder
}

const OrderListProductItem: FC<Props> = observer(({ productOrder }) => {
	const deviceWidth = theme.deviceWidth

	return (
		<View style={styles.container}>
			<Image
				style={styles.productImage}
				source={{ uri: getSizedImageForProduct('cart', deviceWidth, productOrder.product) }}
			/>
			<View style={styles.rightContainer}>
				<Text style={styles.productName}>{productOrder.product.productName}</Text>
				<Text style={styles.pzn}>{`PZN: ${productOrder.product.code}`}</Text>
				<Text style={styles.quantity}>{`Anzahl:  ${productOrder.quantity}`}</Text>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: theme.colors.white,
		padding: 16,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		shadowColor: theme.colors.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 5,
		// For below Android API 28
		elevation: 5
	},
	productImage: {
		width: 64,
		padding: 8,
		aspectRatio: 1,
		marginRight: 8
	},
	rightContainer: {
		flexDirection: 'column',
		flex: 1,
		paddingRight: 16
	},
	productName: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.common.large,
		fontWeight: theme.fontWeight.medium,
		fontFamily: theme.fontFamily,
		lineHeight: 24
	},
	pzn: {
		color: theme.colors.lightDarkText,
		fontSize: theme.fontSize.common.medium,
		fontWeight: theme.fontWeight.medium,
		fontFamily: theme.fontFamily,
		lineHeight: 18
	},
	quantity: {
		color: theme.colors.lightDarkText,
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize.common.medium,
		fontWeight: theme.fontWeight.medium,
		lineHeight: 18
	}
})

export default OrderListProductItem
