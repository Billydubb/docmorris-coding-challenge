import { theme } from '@themes/variables/ThemeProvider'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
	sectionKey: string
	userName: string
}

export const CartListSectionHeader: FC<Props> = ({ sectionKey, userName }) => {
	return sectionKey === 'prescription' ? (
		<View style={styles.prescriptionCardHeader}>
			<Text style={styles.recipeFor}>Kassenrezept für</Text>
			<Text style={styles.userName}>{userName}</Text>
		</View>
	) : (
		<View style={[styles.prescriptionCardHeader, styles.noPrescriptionBorder]}>
			<Text style={styles.userName}>Rezeptfreie Produkte</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	prescriptionCardHeader: {
		width: '100%',
		backgroundColor: theme.colors.grey7,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderTopWidth: 4,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		borderColor: theme.colors.deepPink
	},
	noPrescriptionBorder: {
		borderColor: theme.colors.lightDarkText
	},
	recipeFor: {
		color: theme.colors.deepPink,
		fontSize: theme.fontSize.common.extraSmall,
		fontWeight: theme.fontWeight.normal,
		fontFamily: theme.fontFamily,
		lineHeight: 15
	},
	userName: {
		color: theme.colors.darkText,
		fontSize: theme.fontSize.common.large,
		fontWeight: theme.fontWeight.medium,
		fontFamily: theme.fontFamily,
		lineHeight: 24
	}
})

export default CartListSectionHeader
