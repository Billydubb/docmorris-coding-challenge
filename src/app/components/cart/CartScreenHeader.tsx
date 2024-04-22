import { theme } from '@themes/variables/ThemeProvider'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

export const CartScreenHeader = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.paddingContainer}>
				<Text style={styles.text}>Warenkorb</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.white
	},
	paddingContainer: {
		paddingVertical: 12,
		borderBottomWidth: StyleSheet.hairlineWidth * 4,
		borderBottomColor: theme.colors.lightGrey
	},
	text: {
		fontSize: theme.fontSize.major.small,
		fontWeight: theme.fontWeight.semiBold,
		color: theme.colors.darkText,
		fontFamily: theme.fontFamily,
		lineHeight: 24,
		textAlign: 'center'
	}
})
