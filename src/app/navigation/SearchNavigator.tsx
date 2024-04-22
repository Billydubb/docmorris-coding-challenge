import ProductDetailScreen from '@containers/ProductDetailScreen'
import ProductListScreen from '@containers/ProductListScreen'
import images from '@images'
import { SearchNavigatorParamList } from '@navigation/types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { theme } from '@themes/variables/ThemeProvider'
import React from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchNativeStackNavigator = createNativeStackNavigator<SearchNavigatorParamList>()

export const SearchNavigator = (): JSX.Element => {
	return (
		<SearchNativeStackNavigator.Navigator
			screenOptions={(): object => ({
				gestureEnabled: true,
				animationTypeForReplace: 'push',
				animation: 'simple_push',
				initialRouteName: 'ProductDetailScreen'
			})}
		>
			<SearchNativeStackNavigator.Screen
				name={'ProductListScreen'}
				component={ProductListScreen}
				options={{ headerShown: false }}
			/>
			<SearchNativeStackNavigator.Screen
				name={'ProductDetailScreen'}
				component={ProductDetailScreen}
				options={({ navigation }) => ({
					headerShown: true,
					headerBackTitleVisible: false,
					headerTitle: '',
					headerBackImageSource: images.icons.backButton,
					headerTransparent: true,
					headerTintColor: theme.colors.darkText,
					headerLeft: () => {
						return (
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<Image source={images.icons.backButton}></Image>
							</TouchableOpacity>
						)
					}
				})}
			/>
		</SearchNativeStackNavigator.Navigator>
	)
}
