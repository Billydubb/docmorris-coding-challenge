import CartListItem from '@components/cart/CartListItem'
import { ItemListGroupHeader } from '@components/common/ItemListGroupHeader'
import LoadingButton from '@components/common/LoadingButton'
import { ScreenParamList, TabNavigatorParamList } from '@navigation/types'
import { BottomTabScreenProps, useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { theme } from '@themes/variables/ThemeProvider'
import { useMobx } from 'app/state/StateProvider'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import TrianglePattern from '../images/svg/trianglePattern.svg'

export type CartScreenParamsList = ScreenParamList<'CartScreen'>
type CartScreenProps = BottomTabScreenProps<TabNavigatorParamList, 'CartScreen'>

const CartScreen: FC<CartScreenProps> = observer(({ navigation }) => {
	const tabBarHeight = useBottomTabBarHeight()
	const insets = useSafeAreaInsets()
	const { cartStore, userStore } = useMobx()

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

	const onPressPurchase = () => {
		cartStore.checkOutOrder()
		navigation.navigate('OrdersScreen', {
			screenName: 'OrdersScreen'
		})
	}

	const renderListFooter = () => {
		if (cartStore.numProductsInCart === 0) {
			return null
		}

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
				keyExtractor={(cartItem, index) => `${cartItem.product.code}-${index}`}
				renderItem={({ item }) => <CartListItem cartItem={item}></CartListItem>}
				renderSectionHeader={({ section }) =>
					section.data.length ? (
						<ItemListGroupHeader
							withPrescription={section.key === 'prescription'}
							userName={`${firstName} ${lastName}`}
						></ItemListGroupHeader>
					) : null
				}
				contentContainerStyle={[styles.contentContainer, { paddingBottom: tabBarHeight + insets.bottom }]}
				ListFooterComponent={renderListFooter()}
			/>
			<View style={styles.fixedCTA}>
				<LoadingButton
					disabled={cartStore.numProductsInCart === 0}
					filled
					onPress={onPressPurchase}
					title="Kostenpflichtig Bestellen"
				></LoadingButton>
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
