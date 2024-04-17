import { ParamListBase } from '@react-navigation/native'

import { OmitKeyAndUndefineRecordForUnion } from './GenericUtility'

/**
 * Omit the `screenName` property from all screens in a Navigator
 */
export type OmitNameFromNavigatorScreens<Navigator extends ParamListBase> = {
	[Key in keyof Navigator]: OmitKeyAndUndefineRecordForUnion<Navigator[Key], 'screenName'>
}
