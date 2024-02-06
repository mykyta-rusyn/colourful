import React from 'react';

import {Init} from './src/main';

import {fontState, imageState, themeState} from '@colourful/state';
import {preventAutoHideAsync} from 'expo-splash-screen';
import {Provider} from 'mobx-react';

preventAutoHideAsync();

export default class App extends React.Component {
	render(): React.ReactNode {
		return (
			<Provider
				fontState={fontState}
				imageState={imageState}
				themeState={themeState}
			>
				<Init />
			</Provider>
		);
	}
}
