# 🗺️ Navigation folder

The navigation folder contains all the routing for the app.

The types folder holds the definition for all available screens and the navigation structure. And each of the
`Navigator` files includes the react-navigation stack of the screens and sub-navigators.

---

## 🚕 Navigators

When creating a route to a Navigator, the `name` provided should have the format `{NavigatorPrefix}Navigator`. So,
for example, the navigator containing the cart screens is called `CartNavigator`. **_Each Navigator should be placed in
its own file, named accordingly._**

`TabNavigator.tsx`

```jsx
<BottomTabNavigator.Navigator>
	<BottomTabNavigator.Screen name={'CartNavigator'} component={CartNavigator} />
</BottomTabNavigator.Navigator>
```

`CartNavigator.tsx`

```jsx
<NativeStackNavigator.Navigator>
	<NativeStackNavigator.Screen name={'CartScreen'} component={CartScreen} />
	<NativeStackNavigator.Screen name={'CartProductScreen'} component={ProductScreen} />
</NativeStackNavigator.Navigator>
```

---

## 🏢 Screens

When creating a route to a Screen, the `name` provided should have the format `{NavigatorPrefix}{ScreenName}`. So,
for example, the route containing the product screen in the cart navigator is called `CartProductScreen`.

The one exception is when the screen name already contains the navigator prefix in itself. For example, the cart initial
screen might be called `CartScreen`, then its `name` in the navigator would be `CartScreen` and not ~~`CartCartScreen`~~.

Screens components can be shared between different Navigators. This means that the same screen can be accessed via
different routes that might provide different params. This also means that it is good practice to code screens that
exist by itself. So screens should never assume a _usage path_ , but instead always implement checks to see from where
it is currently loaded. This is discussed in more depht in the **Typing** section.

`WelcomeNavigator.tsx`

```jsx
<NativeStackNavigator.Navigator>
	<NativeStackNavigator.Screen name={'WelcomeScreen'} component={ProductListScreen} />
	<NativeStackNavigator.Screen name={'WelcomeProductScreen'} component={ProductScreen} />
</NativeStackNavigator.Navigator>
```

`CartNavigator.tsx`

```jsx
<NativeStackNavigator.Navigator>
	<NativeStackNavigator.Screen name={'CartScreen'} component={CartScreen} />
	<NativeStackNavigator.Screen name={'CartProductScreen'} component={ProductScreen} />
</NativeStackNavigator.Navigator>
```

---

## 🩻 Typing

Because of how the Navigation in the app is implemented - with the same screen components being available in multiple
Navigators - `react-navigation`'s default types do not work properly. So a group of custom types exist to provide the
correct `navigation` and `route` prop types.

All this typing is implemented in the `types` folder and it includes a lot of "hidden" manipulation. For these types
to work properly, just a couple of rules need to be followed.

### Screens Param List

Each Screen should have it's own **Param List** and **Name**. Even when no params are required by the screen, it should
still implement the Param List, as this is used to properly infer the `navigation` and `route` props for the screen.

The Param List for a screen should be defined on the screen component file. There is a helper type called
`ScreenParamList` that should be used when defining the Param List for a screen. It takes the `screen name` and,
optionally, the `screen params`.

> The `screen name` should be unique between all screens in the app

---

This example shows how to defined a Param List for a screen that takes NO params:

`ProductListScreen.tsx`

```tsx
import { ScreenParamList } from '@navigation/types'

export type WelcomeScreenParamList = ScreenParamList<'ProductListScreen'>

interface WelcomeScreenProps {
	// ...
}

const ProductListScreen = (props: WelcomeScreenProps): JSX.Element => {
	// ...
}

export default ProductListScreen
```

---

This example shows how to define a Param List for a screen that takes params:

`ProductScreen.tsx`

```tsx
import { ScreenParamList } from '@navigation/types'

export type ProductScreenParamList = ScreenParamList<
	'ProductScreen',
	{
		productId: number
		navigatorPrefix?: 'Welcome' | 'Cart'
	}
>

interface ProductScreenProps {
	// ...
}

const ProductScreen = (props: ProductScreenProps): JSX.Element => {
	// ...
}

export default ProductScreen
```

### Navigators Param List

Navigators are typed as a `Map` with each available route and the Param List for that route. The Param List for a route
can be a `NavigatorScreenParamList` or a `ScreenParamList` or a `ScreenParamList | undefined` (when the screen params
are optional).

> _Although `react-navigation` lists only `undefined` as a valid value as well, we cannot use it, otherwise we won't
> provide a `screen name` to the route. And the `navigation` and `route` props will be incorrectly typed._

When typing a screen route, the screen's component param list should be used.

When typing a navigator route, there is a helper type called `NavigatorScreenParamList` that should be used. This helper
takes another navigator as a param.

The typings for all the navigators should be defined in the `NavigatorParamList.ts` file, inside the types folder, and
then imported in the navigator component file.

`types/NavigatorParamList.ts`

```ts
import { NavigatorScreenParamList } from '@navigation/types'
import { WelcomeScreenParamList } from '.../ProductListScreen.tsx'
import { ProductScreenParamList } from '.../ProductScreen.tsx'
import { CartScreenParamList } from '.../CartScreen.tsx'
import { OnboardingScreenParamList } from '.../OnboardingScreen.tsx'

export type WelcomeNavigatorParamList = {
	ProductListScreen: WelcomeScreenParamList | undefined
	WelcomeProductScreen: ProductScreenParamList
}

export type CartNavigatorParamList = {
	CartScreen: CartScreenParamList
	CartProductScreen: ProductScreenParamList
}

export type AppNavigatorParamList = {
	WelcomeNavigator: NavigatorScreenParamList<WelcomeNavigator>
	CartNavigator: NavigatorScreenParamList<CartNavigator>
	OnboardingScreen: OnboardingScreenParamList
}
```

`CartNavigator.tsx`

```tsx
import { OmitNameFromNavigatorScreens, CartNavigatorParamList } from '@navigation/types'

const NativeStackNavigator = createNativeStackNavigator<OmitNameFromNavigatorScreens<CartNavigatorParamList>>()

const CartNavigator = (): JSX.Element => {
	return (
		<NativeStackNavigator.Navigator>
			<NativeStackNavigator.Screen name={'CartScreen'} component={CartScreen} />
			<NativeStackNavigator.Screen name={'CartProductScreen'} component={ProductScreen} />
		</NativeStackNavigator.Navigator>
	)
}

export default CartNavigator
```

`AppNavigator.tsx`

```tsx
import { OmitNameFromNavigatorScreens, AppNavigatorParamList } from '@navigation/types'
import WelcomeNavigator from './WelcomeNavigator.tsx'
import CartNavigator from './CartNavigator.tsx'
import OnboardingScreen from '.../OnboardingScreen.tsx'

const NativeStackNavigator = createNativeStackNavigator<OmitNameFromNavigatorScreens<AppNavigatorParamList>>()

const AppNavigator = (): JSX.Element => {
	return (
		<NativeStackNavigator.Navigator>
			<NativeStackNavigator.Screen name={'WelcomeNavigator'} component={WelcomeNavigator} />
			<NativeStackNavigator.Screen name={'CartNavigator'} component={CartNavigator} />
			<NativeStackNavigator.Screen name={'OnboardingScreen'} component={OnboardingScreen} />
		</NativeStackNavigator.Navigator>
	)
}

export default AppNavigator
```

### Typing the `navigation` and `route` props

As mentioned before, because of how the app navigation is structured, `react-navigation` default types for the
`navigation` and `route` props don't work. Thus, to type these props there are two custom helpers that should be used.
They are the `ScreenNavigationProp` and `ScreenRouteProp`.

You need to provide these types with the Param List for the screen, and internally they will identify all the
navigators where the screen is being used and the params for each of these navigators. Providing, in the end:

-   A list with all the routes/navigators that can be acessed in the screen
-   All the route params the screen can have
-   And if the params in the screen are optional or not

The examples bellow show the most common situations you might find when working with the navigation in the app.

---

Consider the following navigation setup for the examples:

`NavigatorParamList.ts`

```ts
export type WelcomeNavigatorParamList = {
	ProductListScreen: WelcomeScreenParamList
	WelcomeProductScreen: ProductScreenParamList | undefined
}

export type CartNavigatorParamList = {
	CartScreen: CartScreenParamList
	CartProductScreen: ProductScreenParamList
}

export type AppNavigatorParamList = {
	WelcomeNavigator: NavigatorScreenParamList<WelcomeNavigator>
	CartNavigator: NavigatorScreenParamList<CartNavigator>
}
```

#### Screen with NO params

`CartScreen.tsx`

```tsx
export type CartScreenParamList = ScreenParamList<'CartScreen'>

interface CartScreenProps {
	navigation: ScreenNavigationProp<CartScreenParamList>
	route: ScreenRouteProp<CartScreenParamList>
}

// ...
```

In this example:

-   `navigation` will have available the following screens to navigate to:

    -   `'CartScreen' | 'CartProductScreen' | 'CartNavigator' | 'WelcomeNavigator'`

-   `route` will have the following:
    -   `name`: `'CartScreen'`
    -   `params`: `undefined`

#### Screen with OPTIONAL params

`ProductScreen.tsx`

```tsx
export type ProductScreenParamList = ScreenParamList<
	'ProductScreen',
	{
		productId: number
		navigatorPrefix?: 'Welcome' | 'Cart'
	}
>

interface CartScreenProps {
	navigation: ScreenNavigationProp<ProductScreenParamList>
	route: ScreenRouteProp<ProductScreenParamList>
}

// ...
```

In this example:

-   `navigation` will have available the following screens to navigate to:

    -   `'CartScreen' | 'CartProductScreen' | 'ProductListScreen' | 'WelcomeProductScreen' | 'CartNavigator' | 'WelcomeNavigator'`

> When a screen is available in more than one navigator, the routes from all the navigators that have the screen are
> available. **But be carefull!** In such cases, having a route available doesn't necessarily means the screen is
> directly navigatable. If the `WelcomeProductScreen` is the current one, trying to directly navigate to `CartScreen` or
> `CartProductScreen` will not work, since those screens are in a different navigator. So, preferably, when navigating
> in such types of screens, prefer to use `Navigators`.

> There are, though, some cases where you want to use the screen directly. In this case just check first if you are in
> fact in the expected navigator. That can be done by either providing a param to the screen, such as the
> `navigatorPrefix` in the example, or simply by checking the route name, since the screen name contains the Navigator
> Prefix in it.

-   `route` will have the following:

    -   `name`: `'CartProductScreen' | 'WelcomeProductScreen'`
    -   `params`: `{ productId: number, navigatorPrefix?: 'Welcome' | 'Cart' } | undefined`

> Because in the `WelcomeNavigator` we say that the Product Screen params are `ProductScreenParamList | undefined` this
> is carried also to the other places were the Product Screen is used. So even though the `CartNavigator` says the
> Product Screen params are `ProductScreenParamList`, it is treated as `ProductScreenParamList | undefined`

#### Screen with REQUIRED params

`ProductListScreen.tsx`

```tsx
export type WelcomeScreenParamList = ScreenParamList<
	'ProductListScreen',
	{
		isLoggedIn: boolean
		user?: User
	}
>

interface WelcomeScreenProps {
	navigation: ScreenNavigationProp<WelcomeScreenParamList>
	route: ScreenRouteProp<WelcomeScreenParamList>
}

// ...
```

In this example:

-   `navigation` will have available the following screens to navigate to:

    -   `'ProductListScreen' | 'WelcomeProductScreen' | 'CartNavigator' | 'WelcomeNavigator'`

-   `route` will have the following:
    -   `name`: `'ProductListScreen'`
    -   `params`: `{ isLoggedIn: boolean, user?: User }`
