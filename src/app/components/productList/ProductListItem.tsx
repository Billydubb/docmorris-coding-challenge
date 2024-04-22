import { SearchNavigatorParamList } from '@navigation/types'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { theme } from '@themes/variables/ThemeProvider'
import { Product } from 'app/models/Product'
import React, { FC } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
	product: Product
}

export const ProductListItem: FC<Props> = ({ product }) => {
	const navigation = useNavigation<NavigationProp<SearchNavigatorParamList>>()
	const formatBasePrice = (basePrice: string) => {
		const split = basePrice.split('/')

		return `${split[0]} | ${split[1]}`
	}

	const onPress = () => {
		navigation.navigate('ProductDetailScreen', {
			screenName: 'ProductDetailScreen',
			product
		})
	}

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.container}>
				<Image style={styles.productImage} source={{ uri: product.mediaGroupImages[0].media.px300 }} />
				<View style={styles.textContainer}>
					<Text style={styles.productName}>{product.productName}</Text>
					<View style={styles.productInfoRow}>
						<Text style={styles.productInfoText}>{product.quantity}</Text>
						<Text style={styles.dotSeparator}>•</Text>
						<Text style={styles.productInfoText}>{product.pharmaceuticalForm}</Text>
						{!!product.categorization && (
							<>
								<Text style={styles.dotSeparator}>•</Text>
								<Text style={styles.productInfoText}>{product.categorization}</Text>
							</>
						)}
					</View>
					<Text style={styles.price}>{product.price} €</Text>
					<Text style={styles.basePrice}>{formatBasePrice(product.basePrice)}</Text>
					<Text
						style={{
							...styles.stockAvailability,
							color: product.inStock ? theme.colors.brandTertiary : theme.colors.lightDarkText
						}}
					>
						{product.inStock ? 'Auf Lager' : 'Ausverkauft'}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		padding: 24,
		borderTopWidth: 1,
		borderTopColor: theme.colors.grey
	},
	productImage: {
		width: '100%',
		flex: 1,
		aspectRatio: 1,
		marginRight: 16
	},
	textContainer: {
		flexDirection: 'column',
		flex: 2
	},
	productName: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.common.large,
		fontWeight: theme.fontWeight.bold,
		fontFamily: theme.fontFamily,
		lineHeight: 20,
		marginBottom: 4
	},
	productInfoRow: {
		flexDirection: 'row',
		marginBottom: 8
	},
	productInfoText: {
		color: theme.colors.lightDarkText,
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize.common.medium,
		fontWeight: theme.fontWeight.medium,
		lineHeight: 18
	},
	dotSeparator: {
		marginHorizontal: 8
	},
	price: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.major.small,
		lineHeight: 24,
		fontWeight: theme.fontWeight.semiBold
	},
	basePrice: {
		color: theme.colors.lightDarkText,
		fontSize: theme.fontSize.common.extraSmall,
		lineHeight: 15,
		marginBottom: 8,
		fontFamily: theme.fontFamily
	},
	stockAvailability: {
		fontSize: theme.fontSize.common.small,
		fontFamily: theme.fontFamily,
		lineHeight: 15
	}
})

export default ProductListItem
