import { StyleSheet } from 'react-native'
import { theme } from '../themes/variables/ThemeProvider'

const navigatorStyles = StyleSheet.create({
	iconLabelContainer: {
		alignItems: 'center',
		width: 100
	},
	inactiveIcon: {
		tintColor: theme.brandGrey,
		resizeMode: 'contain',
		height: 22
	},
	activeIcon: {
		tintColor: theme.brandActive,
		resizeMode: 'contain',
		height: 22
	}
})

export default navigatorStyles
