import React from 'react';

import {Init} from './src/main';

import {preventAutoHideAsync} from 'expo-splash-screen';

preventAutoHideAsync();

export default class App extends React.Component {
	render(): React.ReactNode {
		return (
			<Init />
		);
	}
}
