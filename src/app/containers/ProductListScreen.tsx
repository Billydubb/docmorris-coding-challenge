import { ProductListItem } from "@components/productList/ProductListItem"
import Images from '@images'
import { ScreenParamList } from '@navigation/types'
import { theme } from '@themes/variables/ThemeProvider'
import { isAndroid } from '@utils/PlatformUtils'
//TODO: Remove this and supply the products from a mobX store later on
import ProductListHeaderComponent from "@components/productList/ProductListHeaderComponent"
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { getProducts } from 'app/api/getProducts'
import React from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"


export type ProductListScreenParamList = ScreenParamList<'ProductListScreen'>

const ProductListScreen = () => { 

	const tabBarHeight = useBottomTabBarHeight();
	const insets = useSafeAreaInsets();

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.searchContainer}>
				<View style={styles.searchInputContainer}>
					<TextInput
						accessibilityLabel={'SearchField'}
						style={styles.textInput}
						autoCorrect={false}
						selectionColor={theme.colors.brandTertiary}
						returnKeyType={'search'}
						placeholder={'Suche'}
						allowFontScaling={false}
						placeholderTextColor={theme.colors.searchBarPlaceholder}
					/>
					<Image source={Images.icons.search} style={styles.searchAndBarcodeIcon} />
				</View>
			</SafeAreaView>
			<FlatList
				data={getProducts()}
				initialNumToRender={10}
				keyExtractor={(product) => product.code}
				renderItem={({item}) => <ProductListItem product={item}></ProductListItem>}
				contentContainerStyle={{paddingBottom: tabBarHeight + insets.bottom}}
				// TODO: pass the number of search results into numResults rather than 50
				ListHeaderComponent={() => <ProductListHeaderComponent numResults={50} ></ProductListHeaderComponent>}
				// Makes the header sticky
				stickyHeaderIndices={[0]}
			></FlatList>

		</View>
)}


const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffffff",
	},
	searchAndBarcodeIcon: {
		tintColor: theme.colors.searchBarIconColor,
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
		backgroundColor: theme.colors.searchInputContainerColor,
		borderColor: theme.colors.searchInputContainerColor,
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
		color: theme.colors.brandDark,
		fontFamily: theme.fontFamily,
		textAlign: 'center'
	}
})

export default ProductListScreen
