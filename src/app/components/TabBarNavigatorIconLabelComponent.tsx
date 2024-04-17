import React from 'react'
import { Image, ImageSourcePropType, View } from 'react-native'

import navigatorStyles from '../navigation/styles'

interface TabBarNavigatorIconLabelProps {
	icon: ImageSourcePropType
}

const TabBarNavigatorIconLabelComponent = ({ icon }: TabBarNavigatorIconLabelProps): JSX.Element => {
	return (
		<View style={navigatorStyles.iconLabelContainer}>
			<Image source={icon} style={navigatorStyles.inactiveIcon} />
		</View>
	)
}

export default TabBarNavigatorIconLabelComponent
