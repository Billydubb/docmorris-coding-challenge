import Images from '@images'
import navigatorStyles from '@navigation/styles'
import React from 'react'
import { Image, View } from 'react-native'

const AccountTabBarIconComponent = () => (
	<View>
		<View style={navigatorStyles.iconLabelContainer}>
			<Image source={Images.icons.account} style={navigatorStyles.inactiveIcon} />
		</View>
	</View>
)

export default AccountTabBarIconComponent
