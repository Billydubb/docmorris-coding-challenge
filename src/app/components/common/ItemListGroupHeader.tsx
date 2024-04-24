import { theme } from '@themes/variables/ThemeProvider'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
	withPrescription?: boolean
	userName?: string
}

/**
 * Header component under which cart and order items are grouped by
 * whether or not they are with a prescription
 */
export const ItemListGroupHeader: FC<Props> = ({ withPrescription, userName }) => {
	return withPrescription ? (
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
