import CartListItem from '@components/cart/CartListItem'
import CartListSectionHeader from '@components/cart/CartListSectionHeader'
import LoadingButton from '@components/common/LoadingButton'
import { ScreenParamList } from '@navigation/types'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { theme } from '@themes/variables/ThemeProvider'
import { useMobx } from 'app/state/StateProvider'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import TrianglePattern from '../images/svg/trianglePattern.svg'

export type CartScreenParamsList = ScreenParamList<'CartScreen'>

const CartScreen = observer(() => {
	const tabBarHeight = useBottomTabBarHeight()
	const insets = useSafeAreaInsets()
	const { productStore } = useMobx()

	const data = [
		{
			key: 'prescription',
			data: [productStore.products[0], productStore.products[1], productStore.products[2]]
		},
		{
			key: 'noPrescription',
			data: [
				productStore.products[1],
				productStore.products[2],
				productStore.products[3],
				productStore.products[4]
			]
		}
	]

	const renderListFooter = () => {
		return (
			<>
				<TrianglePattern style={styles.trianglePattern} height={20} width={theme.deviceWidth} />
				<View style={[styles.totalPriceContainer, { width: theme.deviceWidth }]}>
					<Text style={styles.totalPrice}>Gesamtpreis</Text>
					<Text style={styles.totalPrice}>{'15,78 €'}</Text>
				</View>
			</>
		)
	}

	return (
		<View style={styles.container}>
			<SectionList
				sections={data}
				initialNumToRender={productStore.pageSize}
				keyExtractor={(product, index) => `${product.code}-${index}`}
				renderItem={({ item }) => <CartListItem product={item}></CartListItem>}
				renderSectionHeader={({ section }) => (
					// TODO: create a UserStore and pass down the userName from the UserStore
					<CartListSectionHeader sectionKey={section.key} userName={'Max Mustermann'}></CartListSectionHeader>
				)}
				contentContainerStyle={[styles.contentContainer, { paddingBottom: tabBarHeight + insets.bottom }]}
				stickyHeaderIndices={[0]}
				onEndReached={() => productStore.loadMoreProducts()}
				onEndReachedThreshold={0.5}
				ListFooterComponent={renderListFooter()}
			/>
			<View style={styles.fixedCTA}>
				<LoadingButton filled onPress={Function.prototype()} title="Kostenpflichtig Bestellen"></LoadingButton>
			</View>
		</View>
	)
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white,
		paddingTop: 24
	},
	contentContainer: {
		padding: 24
	},
	trianglePattern: {
		alignSelf: 'center',
		marginTop: 24
	},
	totalPriceContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: theme.colors.grey7,
		paddingTop: 8,
		paddingHorizontal: 24,
		paddingBottom: 34,
		alignSelf: 'center',
		position: 'relative',
		top: -4
	},
	totalPrice: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.major.small,
		fontWeight: theme.fontWeight.semiBold,
		fontFamily: theme.fontFamily,
		lineHeight: 24
	},
	fixedCTA: {
		position: 'absolute',
		backgroundColor: theme.colors.white,
		bottom: 0,
		padding: 24,
		paddingBottom: 8,
		width: '100%'
	}
})

export default CartScreen
