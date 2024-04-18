import RootContainer from '@containers/RootContainer';
import { configure } from 'mobx';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

configure({
    enforceActions: "always",
    useProxies: "always"      
});

const App = () => {
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	return <RootContainer />
}

export default App
