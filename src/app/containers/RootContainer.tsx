import AppNavigator from '@navigation/AppNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { theme } from '@themes/variables/ThemeProvider'
import { StateProvider } from 'app/state/StateProvider'
import React from 'react'
import { StatusBar, StatusBarStyle, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const RootContainer = (): JSX.Element => {
	return (
		<SafeAreaProvider>
			<StateProvider>
				<NavigationContainer>
					<StatusBar
						barStyle={theme.statusBarDefault as StatusBarStyle}
						backgroundColor={theme.colors.brandPrimary}
						animated
					/>
					<GestureHandlerRootView style={styles.rootView}>
						<AppNavigator />
					</GestureHandlerRootView>
				</NavigationContainer>
			</StateProvider>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	rootView: {
		flex: 1
	}
})

export default RootContainer
