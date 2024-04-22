import { getRgbaFromHex } from '@themes/variables/getRgbaFromHex'
import { theme } from '@themes/variables/ThemeProvider'
import React, { FC } from 'react'
import { ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

interface Props {
	title: string
	onPress: () => void
	isLoading?: boolean
	disabled?: boolean
	style?: StyleProp<ViewStyle>
	borderLess?: boolean
	filled?: boolean
	testID?: string
}

const LoadingButton: FC<Props> = ({ title, onPress, isLoading, disabled, style, filled, testID }) => {
	const containerStyles = [
		styles.button,
		filled ? styles.filled : styles.outline,
		disabled && (filled ? styles.filledDisabled : styles.outlineDisabled)
	]

	const textStyles = [
		styles.text,
		filled && { color: theme.colors.white },
		disabled && !filled && styles.textOutlineDisabled
	]

	return (
		<TouchableOpacity
			style={[containerStyles, style]}
			activeOpacity={0.5}
			disabled={disabled || isLoading}
			onPress={onPress}
			testID={testID || 'loading-button'}
		>
			{isLoading ? (
				<ActivityIndicator color={theme.colors.white} />
			) : (
				<Text style={[textStyles]} numberOfLines={2}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	)
}

export default LoadingButton

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		justifyContent: 'center',
		height: 48,
		borderRadius: 8,
		paddingVertical: 13
	},
	text: {
		fontSize: theme.fontSize.common.extraLarge,
		fontFamily: theme.fontFamily,
		fontWeight: theme.fontWeight.medium,
		lineHeight: 22,
		textAlign: 'center',
		color: theme.colors.brandPrimary
	},
	filled: {
		backgroundColor: theme.colors.brandPrimary
	},
	filledDisabled: {
		backgroundColor: getRgbaFromHex(theme.colors.brandPrimary, 0.5)
	},
	outline: {
		borderWidth: 1,
		borderColor: theme.colors.brandPrimary,
		backgroundColor: theme.colors.white
	},
	outlineDisabled: {
		borderColor: getRgbaFromHex(theme.colors.brandPrimary, 0.5)
	},
	textOutlineDisabled: {
		color: getRgbaFromHex(theme.colors.brandPrimary, 0.5)
	}
})
