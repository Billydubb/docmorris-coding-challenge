import { theme } from '@themes/variables/ThemeProvider'
import { Product } from 'app/models/Product'
import React, { FC } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

interface Props {
	product: Product
}


export const ProductListItem: FC<Props> = ({ product }) => {

	return (
		<View style={styles.container}>
			<Image style={styles.productImage} source={{uri: product.mediaGroupImages[0].media["px300"]}} />
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
				<Text style={styles.basePrice}>{product.basePrice}</Text>
				<Text style={styles.stockAvailability}>{product.inStock ? "Auf Lager" : "Ausverkauft"}</Text>
			</View>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		padding: 24,
	},
	productImage: {
		width: "100%",
		flex: 1,
		aspectRatio: 1,
		marginRight: 16
	},
	textContainer: {
		flexDirection: "column",
		flex: 2
	},
	productName: { 
		color: theme.darkText,
		fontSize: theme.fontSize.common.large,
		fontWeight: "bold",
		fontFamily: theme.fontFamily,
		lineHeight: 20,
		marginBottom: 4,
	},
	productInfoRow: {
		flexDirection: "row",
		marginBottom: 8,
	},
	productInfoText: {
		color: theme.lightDarkText,
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize.common.medium,
		fontWeight: theme.fontWeight.medium,
		lineHeight: 18,
	},
	dotSeparator: {
		marginHorizontal: 8
	},
	price: {
		color: theme.darkText,
		fontSize: theme.fontSize.major.small,
		lineHeight: 24,
		fontWeight: theme.fontWeight.semiBold
	},
	basePrice: {
		color: theme.lightDarkText,
		fontSize: theme.fontSize.common.extraSmall,
		lineHeight: 15,
		marginBottom: 8
	},
	stockAvailability: {

	}
	
})

export default ProductListItem
