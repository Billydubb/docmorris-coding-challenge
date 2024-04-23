import { theme } from '@themes/variables/ThemeProvider'
import React, { FC, useMemo, useState } from 'react'
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import RenderHtml from 'react-native-render-html'
import truncate from 'truncate-html'

const INITIAL_TEXT_LENGTH = 50 // Initial number of words, rather than characters.

interface Props {
	htmlContent: string
}

export const ProductDescription: FC<Props> = ({ htmlContent }) => {
	const [isExpanded, setIsExpanded] = useState(false)
	const { width } = useWindowDimensions()
	const truncatedHtml = useMemo(() => truncate(htmlContent, INITIAL_TEXT_LENGTH, { byWords: true }), [htmlContent])

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
	}

	const source = {
		html: isExpanded ? htmlContent : truncatedHtml
	}

	return (
		<View>
			<RenderHtml contentWidth={width} source={source} />
			<Text onPress={toggleExpanded} style={styles.toggleText}>
				{isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'} {'>'}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	toggleText: {
		fontSize: theme.fontSize.common.extraLarge,
		fontWeight: theme.fontWeight.medium,
		color: theme.colors.brandPrimary,
		fontFamily: theme.fontFamily,
		lineHeight: 21,
		marginTop: 16
	}
})
