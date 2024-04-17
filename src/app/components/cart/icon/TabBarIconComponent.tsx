import Images from '@images'
import navigatorStyles from '@navigation/styles'
import React from 'react'
import { Image, View } from 'react-native'

const CartTabBarIconComponent = () => (
	<View>
		<View style={navigatorStyles.iconLabelContainer}>
			<Image source={Images.icons.cart} />
		</View>
	</View>
)

export default CartTabBarIconComponent
