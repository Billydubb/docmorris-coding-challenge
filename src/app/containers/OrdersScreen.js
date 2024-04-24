"use strict";
exports.__esModule = true;
var OrderListItem_1 = require("@components/orders/OrderListItem");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var ThemeProvider_1 = require("@themes/variables/ThemeProvider");
var StateProvider_1 = require("app/state/StateProvider");
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var lodi = {};
var OrdersScreen = mobx_react_lite_1.observer(function () {
    var tabBarHeight = bottom_tabs_1.useBottomTabBarHeight();
    var insets = react_native_safe_area_context_1.useSafeAreaInsets();
    var _a = StateProvider_1.useMobx(), ordersStore = _a.ordersStore, userStore = _a.userStore;
    return (<react_native_1.View style={styles.container}>
			<react_native_1.FlatList data={ordersStore.orders} keyExtractor={function (item) { return item.orderId; }} renderItem={function (_a) {
        var item = _a.item;
        return <OrderListItem_1.OrderListItem order={item} user={userStore.user}></OrderListItem_1.OrderListItem>;
    }} contentContainerStyle={[styles.contentContainer, { paddingBottom: tabBarHeight + insets.bottom }]}/>
		</react_native_1.View>);
});
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ThemeProvider_1.theme.colors.grey7,
        padding: 24
    },
    contentContainer: {}
});
exports["default"] = OrdersScreen;
