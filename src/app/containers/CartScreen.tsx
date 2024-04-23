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
	const { productStore, cartStore, userStore } = useMobx()
	const {
		user: { firstName, lastName }
	} = userStore

	const data = [
		{
			key: 'prescription',
			data: cartStore.prescriptionCartScreenProducts
		},
		{
			key: 'noPrescription',
			data: cartStore.cartScreenProducts
		}
	]

	const renderListFooter = () => {
		return (
			<>
				<TrianglePattern style={styles.trianglePattern} height={20} width={theme.deviceWidth} />
				<View style={[styles.totalPriceContainer, { width: theme.deviceWidth }]}>
					<Text style={styles.totalPrice}>Gesamtpreis</Text>
					<Text style={styles.totalPrice}>{`${cartStore.totalPrice.toFixed(2)} €`}</Text>
				</View>
			</>
		)
	}

	return (
		<View style={styles.container}>
			<SectionList
				sections={data}
				initialNumToRender={productStore.pageSize}
				keyExtractor={(cartItem, index) => `${cartItem.product.code}-${index}`}
				renderItem={({ item }) => <CartListItem cartItem={item}></CartListItem>}
				renderSectionHeader={({ section }) => (
					<CartListSectionHeader
						sectionKey={section.key}
						userName={`${firstName} ${lastName}`}
					></CartListSectionHeader>
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
		flex: 1,
		backgroundColor: theme.colors.white
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
