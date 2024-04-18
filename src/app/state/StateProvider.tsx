import React, { createContext, FC, useContext } from "react";
import { ViewProps } from "react-native";
import { CartStore, cartStore } from "./CartStore";
import { OrdersStore, ordersStore } from "./OrdersStore";
import { ProductStore, productStore } from './ProductStore';

interface State {
  productStore: ProductStore
  cartStore: CartStore
  ordersStore: OrdersStore
}

const StateContext = createContext<State>({
  cartStore,
  ordersStore,
  productStore
});


export const StateProvider: FC<ViewProps> = ({ children }) => {
  return (
      <StateContext.Provider value={{cartStore, ordersStore, productStore}}>
        {children}
      </StateContext.Provider>
  );
};

export const useMobx = () => {
  const appState = useContext(StateContext);
  return appState;
};
