import Images from '@images'
import { theme } from '@themes/variables/ThemeProvider'
import { Product } from 'app/models/Product'
import React, { FC, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

interface Props {
	product: Product
}

export const CartListItem: FC<Props> = ({ product }) => {
	const [quantity, setQuantity] = useState('')
	const handleChange = (value: string) => {
		const numericValue = value.replace(/[^0-9]/g, '')
		setQuantity(numericValue)
	}

	return (
		<View style={styles.prescriptionCardBody}>
			<View style={styles.prescriptionCardContent}>
				<Image style={styles.productImage} source={{ uri: product.mediaGroupImages[0].media.px140 }} />
				<View style={styles.rightContainer}>
					<Text style={styles.productName}>{product.productName}</Text>
					<View style={styles.quantityAndPriceRow}>
						<View style={styles.quantityContainer}>
							<Text style={styles.quantity}>Menge:</Text>
							<View style={styles.quantityRow}>
								<TouchableOpacity style={styles.quantityButton}>
									<Image source={Images.icons.trash} style={styles.quantityImage}></Image>
								</TouchableOpacity>
								<TextInput
									keyboardType="numeric"
									style={styles.quantityInput}
									value={quantity}
									onChangeText={handleChange}
								/>
								<TouchableOpacity style={styles.quantityButton}>
									<Image source={Images.icons.plus} style={styles.quantityImage}></Image>
								</TouchableOpacity>
							</View>
						</View>
						<Text style={styles.price}>{`${product.price} €`}</Text>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	prescriptionCardBody: {
		width: '100%',
		backgroundColor: theme.colors.white,
		padding: 8,
		paddingTop: 24,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		shadowColor: theme.colors.black,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 5,
		// For below Android API 28
		elevation: 5
	},
	prescriptionCardContent: {
		flexDirection: 'row'
	},
	productImage: {
		width: 64,
		padding: 8,
		aspectRatio: 1,
		marginRight: 16
	},
	rightContainer: {
		flexDirection: 'column',
		flex: 1,
		paddingRight: 16
	},
	quantityAndPriceRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 4
	},
	productName: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.common.large,
		fontWeight: theme.fontWeight.bold,
		fontFamily: theme.fontFamily,
		lineHeight: 20,
		marginBottom: 4
	},
	quantityContainer: {
		marginBottom: 10
	},
	quantity: {
		color: theme.colors.lightDarkText,
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize.common.extraSmall,
		fontWeight: theme.fontWeight.medium,
		lineHeight: 15,
		marginBottom: 8
	},
	quantityRow: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	quantityButton: {
		width: 32,
		height: 38,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: theme.colors.backgroundGrey,
		borderRadius: 8
	},
	quantityImage: {
		width: 20,
		aspectRatio: 1
	},
	quantityInput: {
		marginHorizontal: 6,
		width: 48,
		height: 38,
		borderRadius: 6,
		borderWidth: 1,
		textAlign: 'center',
		borderColor: theme.colors.brandActive
	},
	price: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.major.small,
		fontWeight: theme.fontWeight.bold,
		fontFamily: theme.fontFamily,
		lineHeight: 24,
		marginLeft: 8,
		alignSelf: 'flex-end'
	}
})

export default CartListItem
