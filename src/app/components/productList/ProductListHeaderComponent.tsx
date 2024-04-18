import { theme } from '@themes/variables/ThemeProvider'
import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface Props {
	numResults: number
}


export const ProductListHeaderComponent: FC<Props> = ({ numResults }) => {

	return (
			<View style={styles.container}>
				<Text style={styles.text}>{`${numResults} Ergebnisse`}</Text>
			</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		paddingHorizontal: 24,
		paddingVertical: 8,
		backgroundColor: "#ffffff",
	},
	text: {
		fontFamily: theme.fontFamily,
		fontSize: theme.fontSize.common.extraLarge,
		fontWeight: theme.fontWeight.medium,
		lineHeight: 24,
	},
	
})

export default ProductListHeaderComponent
