import Images from '@images'
import { ScreenParamList } from '@navigation/types'
import { theme } from '@themes/variables/ThemeProvider'
import { isAndroid } from '@utils/PlatformUtils'
//TODO: Remove this and supply the products from a mobX store later on
import { ProductListItem } from "@components/productList/ProductListItem"
import { getProducts } from 'app/api/getProducts'
import React from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'

export type ProductListScreenParamList = ScreenParamList<'ProductListScreen'>

const ProductListScreen = () => (
	<>
		<SafeAreaView style={styles.searchContainer}>
			<View style={styles.searchInputContainer}>
				<TextInput
					accessibilityLabel={'SearchField'}
					style={styles.textInput}
					autoCorrect={false}
					selectionColor={theme.brandTertiary}
					returnKeyType={'search'}
					placeholder={'Suche'}
					allowFontScaling={false}
					placeholderTextColor={theme.searchBarPlaceholder}
				/>
				<Image source={Images.icons.search} style={styles.searchAndBarcodeIcon} />
			</View>
		</SafeAreaView>
		<FlatList
			data={getProducts()}
			initialNumToRender={10}
			keyExtractor={(product) => product.code}
			renderItem={({item}) => <ProductListItem product={item}></ProductListItem>}
			// ListHeaderComponent={} // TODO: This is for tne number of results
			// ItemSeparatorComponent={} TODO: do the
		></FlatList>

	</>
)


const styles = StyleSheet.create({
	searchAndBarcodeIcon: {
		tintColor: theme.searchBarIconColor,
		resizeMode: 'contain',
		width: 24,
		height: 24,
		marginTop: 1
	},
	searchContainer: {
		marginTop: 4,
		marginRight: 12,
		marginLeft: 12,
		marginBottom: theme.searchInputContainerMarginBottom,
		flexDirection: 'row'
	},
	searchInputContainer: {
		flex: 1,
		marginHorizontal: theme.searchInputContainerMarginHorizontal,
		borderWidth: theme.searchInputContainerBorderWidth,
		borderRadius: theme.searchInputBorderRadius,
		borderColor: theme.searchInputContainerColor,
		backgroundColor: theme.searchInputContainerColor,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: theme.searchInputContainerMarginTop,
		height: theme.searchInputContainerHeight
	},
	textInput: {
		paddingTop: 0,
		paddingBottom: 0,
		includeFontPadding: false,
		flex: 1,
		fontSize: isAndroid && theme.deviceWidth <= 360 ? theme.fontSize.major.extraSmall : theme.fontSize.major.medium,
		color: theme.brandDark,
		fontFamily: theme.fontFamily,
		textAlign: 'center'
	}
})

export default ProductListScreen
