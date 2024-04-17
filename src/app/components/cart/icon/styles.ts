import { StyleSheet } from 'react-native'
import { theme } from '../../../themes/variables/ThemeProvider'

const styles = StyleSheet.create({
	badge: {
		height: 16,
		width: 16,
		backgroundColor: theme.badgeColor,
		top: 0,
		left: 55,
		position: 'absolute',
		borderRadius: 75,
		justifyContent: 'center',
		elevation: 1
	},
	badgeTitle: {
		textAlign: 'center',
		color: theme.inverseTextColor,
		fontSize: theme.fontSize.minor.large
	}
})

export {
	styles
}