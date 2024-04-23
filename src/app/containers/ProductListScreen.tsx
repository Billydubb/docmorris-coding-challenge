import ProductListHeaderComponent from '@components/productList/ProductListHeaderComponent'
import { ProductListItem } from '@components/productList/ProductListItem'
import Images from '@images'
import { ScreenParamList, SearchNavigatorParamList } from '@navigation/types'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { theme } from '@themes/variables/ThemeProvider'
import { isAndroid } from '@utils/PlatformUtils'
import { useMobx } from 'app/state/StateProvider'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export type ProductListScreenParamList = ScreenParamList<'ProductListScreen'>
export type ProductListScreenNavigationProp = NativeStackScreenProps<SearchNavigatorParamList, 'ProductListScreen'>
type Props = ProductListScreenNavigationProp

const ProductListScreen: FC<Props> = observer(() => {
	const tabBarHeight = useBottomTabBarHeight()
	const insets = useSafeAreaInsets()
	const { productStore } = useMobx()

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
						onChangeText={(text) => productStore.setSearchTerm(text)}
					/>
					<Image source={Images.icons.search} style={styles.searchAndBarcodeIcon} />
				</View>
			</SafeAreaView>
			<FlatList
				testID="product-list-flatlist"
				data={productStore.paginatedProducts}
				initialNumToRender={productStore.pageSize}
				keyExtractor={(product) => product.code}
				renderItem={({ item }) => <ProductListItem product={item}></ProductListItem>}
				contentContainerStyle={[styles.contentContainer, { paddingBottom: tabBarHeight + insets.bottom }]}
				ListHeaderComponent={() => (
					<ProductListHeaderComponent
						numResults={productStore.filteredProducts.length}
					></ProductListHeaderComponent>
				)}
				stickyHeaderIndices={[0]}
				onEndReached={() => productStore.loadMoreProducts()}
				onEndReachedThreshold={0.5}
			></FlatList>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff'
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
	},
	contentContainer: {
		minHeight: '100%'
	}
})

export default ProductListScreen
