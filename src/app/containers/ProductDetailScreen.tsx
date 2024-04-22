import LoadingButton from '@components/common/LoadingButton'
import { ProductDescription } from '@components/productDetail/ProductDescription'
import Images from '@images'
import { ScreenParamList, SearchNavigatorParamList } from '@navigation/types'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { theme } from '@themes/variables/ThemeProvider'
import { Product } from 'app/models/Product'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'

export type ProductDetailScreenParamList = ScreenParamList<
	'ProductDetailScreen',
	{
		product: Product
	}
>
type Props = NativeStackScreenProps<SearchNavigatorParamList, 'ProductDetailScreen'>

const ProductDetailScreen: FC<Props> = observer(({ route }) => {
	const tabBarHeight = useBottomTabBarHeight()
	// const { productStore } = useMobx()
	const product = route.params.product

	return (
		<SafeAreaView style={styles.safeAreaContainer}>
			<ScrollView contentContainerStyle={[styles.container, { paddingBottom: tabBarHeight }]}>
				<Image style={styles.productImage} source={{ uri: product.mediaGroupImages[0].media.px1000 }} />
				<Text style={styles.productName}>{product.productName}</Text>
				{/* TODO: implement onPress functionality */}
				<LoadingButton
					style={styles.recipeButton}
					filled
					onPress={Function.prototype()}
					title="In den Warenkorb"
				/>
				<LoadingButton style={styles.cartButton} onPress={Function.prototype()} title="Rezept einlösen" />
				<Text style={styles.segmentTitle}>Details</Text>
				<View style={styles.detailsView}>
					<View style={styles.detailsRow}>
						<Image style={styles.detailsRowImage} source={Images.icons.packageSize} />
						<View>
							<Text style={styles.detailsRowTitle}>Packungsgröße</Text>
							{/* TODO: format the text to read Stück and gram. ml stays the same */}
							<Text style={styles.detailsRowInfo}>{product.quantity}</Text>
						</View>
					</View>
					<View style={styles.detailsRow}>
						<Image style={styles.detailsRowImage} source={Images.icons.pharmaceuticalForm} />
						<View>
							<Text style={styles.detailsRowTitle}>Darreichungsform</Text>
							<Text style={styles.detailsRowInfo}>{product.pharmaceuticalForm}</Text>
						</View>
					</View>
					<View style={styles.detailsRow}>
						<Image style={styles.detailsRowImage} source={Images.icons.pzn} />
						<View>
							<Text style={styles.detailsRowTitle}>PZN</Text>
							<Text style={styles.detailsRowInfo}>{product.code}</Text>
						</View>
					</View>
					<View style={[styles.detailsRow, { marginBottom: 0 }]}>
						<Image style={styles.detailsRowImage} source={Images.icons.companyName} />
						<View>
							<Text style={styles.detailsRowTitle}>Hersteller</Text>
							<Text style={styles.detailsRowInfo}>{product.companyName}</Text>
						</View>
					</View>
				</View>
				<View style={styles.descriptionView}>
					<Text style={styles.segmentTitle}>Beschreibung</Text>
				</View>
				<ProductDescription htmlContent={product.descriptionAsHtml}></ProductDescription>
			</ScrollView>
		</SafeAreaView>
	)
})

const styles = StyleSheet.create({
	safeAreaContainer: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	container: {
		width: '100%',
		paddingHorizontal: 24
	},
	productImage: {
		aspectRatio: 1,
		marginBottom: 16
	},
	productName: {
		fontSize: theme.fontSize.major.large,
		fontWeight: theme.fontWeight.semiBold,
		color: theme.colors.darkText,
		fontFamily: theme.fontFamily,
		lineHeight: 27,
		marginBottom: 28
	},
	cartButton: {
		marginBottom: 15
	},
	recipeButton: {
		marginBottom: 15
	},
	segmentTitle: {
		fontSize: theme.fontSize.major.small,
		fontWeight: theme.fontWeight.semiBold,
		color: theme.colors.darkText,
		fontFamily: theme.fontFamily,
		lineHeight: 24,
		marginBottom: 16
	},
	detailsView: {
		padding: 16,
		borderWidth: StyleSheet.hairlineWidth * 4,
		borderRadius: 8,
		borderColor: theme.colors.lightGrey,
		marginBottom: 30
	},
	detailsRow: {
		flexDirection: 'row',
		marginBottom: 16,
		alignItems: 'center'
	},
	detailsRowImage: {
		width: 32,
		aspectRatio: 1,
		marginRight: 12
	},
	detailsRowTitle: {
		fontSize: theme.fontSize.common.medium,
		fontWeight: theme.fontWeight.medium,
		color: theme.colors.darkText,
		fontFamily: theme.fontFamily,
		lineHeight: 18
	},
	detailsRowInfo: {
		fontSize: theme.fontSize.common.medium,
		fontWeight: theme.fontWeight.medium,
		color: theme.colors.lightDarkText,
		fontFamily: theme.fontFamily,
		lineHeight: 18
	},
	descriptionView: {}
})

export default ProductDetailScreen
