/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @flow
import { Dimensions, Platform } from 'react-native'

import { PLATFORM } from '../../utils/PlatformUtils'

const deviceWidth = Dimensions.get('window').width
const platform = Platform.OS

const fontSize = {
	minor: {
		extraSmall: 5,
		small: 6,
		medium: 7,
		large: 8,
		extraLarge: 9
	},
	common: {
		extraSmall: 10,
		small: 11,
		medium: 12,
		large: 13,
		extraLarge: 14
	},
	major: {
		extraSmall: 15,
		small: 16,
		medium: 17,
		large: 18,
		extraLarge: 24
	}
}

type FontWeightValue = "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
const fontWeight: Record<string, FontWeightValue> = {
	hairLine: "100",
	extraLight: "200",
	light: "300",
	normal: "400",
	medium: "500",
	semiBold: "600",
	bold: "700",
	extraBold: "800",
	heavy: "900",
};

const docmorris = {
	deviceWidth,
	fontSize,
	fontWeight,
	brandGrey: '#666',
	brandActive: '#00463d',
	brandTertiary: '#00965a',
	darkText: "#343434",
	lightDarkText: "#535353",
	get badgeColor() {
		return this.brandTertiary
	},
	inverseTextColor: '#fff',
	searchBarPlaceholder: '#a8a8a8',
	statusBarDefault: platform === PLATFORM.IOS ? 'dark-content' : 'light-content',
	brandPrimary: '#00463d',
	searchInputContainerPadding: 3,
	searchInputContainerHeight: 42,
	searchInputContainerMarginTop: 8,
	searchInputContainerMarginBottom: 6,
	searchInputContainerMarginHorizontal: 8,
	searchInputContainerBorderWidth: 2,
	searchInputContainerColor: '#f2f2f2',
	searchBarIconColor: '#a8a8a8',
	searchInputBorderRadius: 10,
	brandDark: '#222',
	fontFamily: 'Poppins-Regular'
}

export default docmorris
