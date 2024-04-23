import React, { createContext, FC, useContext } from 'react'
import { ViewProps } from 'react-native'

import { CartStore } from './CartStore'
import { OrdersStore } from './OrdersStore'
import { ProductStore } from './ProductStore'
import { UserStore } from './UserStore'

interface State {
	productStore: ProductStore
	cartStore: CartStore
	ordersStore: OrdersStore
	userStore: UserStore
}

const cartStore = new CartStore()
const ordersStore = new OrdersStore()
const productStore = new ProductStore()
const userStore = new UserStore()

const StateContext = createContext<State>({
	cartStore,
	ordersStore,
	productStore,
	userStore
})

export const StateProvider: FC<ViewProps> = ({ children }) => {
	return (
		<StateContext.Provider value={{ cartStore, ordersStore, productStore, userStore }}>
			{children}
		</StateContext.Provider>
	)
}

export const useMobx = () => {
	const appState = useContext(StateContext)

	return appState
}
