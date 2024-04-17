import { NavigatorScreenParams, ParamListBase } from '@react-navigation/native'
import { OmitNameFromNavigatorScreens } from './NavigatorUtility'

/**
 * Helper type to define Param Lists for the app screens
 *
 * Forces providing a `screenName` for each screen, which is used internally to identify the
 * `navigation` and `route` props
 */
export type ScreenParamList<
	Name extends string,
	Params extends object | undefined = undefined
> = Params extends undefined ? { screenName: Name } : { screenName: Name } & Params

/**
 * Helper type to define Param Lists for the app navigators
 *
 * Removes the `screenName` from the screen params, otherwise it would be needed to provide
 * that to the `navigation` functions everytime
 */
export type NavigatorScreenParamList<Navigator extends ParamListBase> = NavigatorScreenParams<
	OmitNameFromNavigatorScreens<Navigator>
>
