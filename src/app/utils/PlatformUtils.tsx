import { Platform } from 'react-native'

export const PLATFORM = {
	ANDROID: 'android',
	IOS: 'ios',
	MATERIAL: 'material',
	WEB: 'web'
}
export const isIOS: boolean = Platform.OS === PLATFORM.IOS
export const isAndroid: boolean = Platform.OS === PLATFORM.ANDROID
