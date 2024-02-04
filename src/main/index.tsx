import React from 'react';
import {initReactI18next} from 'react-i18next';
import {FadeIn, FadeOut} from 'react-native-reanimated';

import {AnimatedImageBackground, languages, loadSavedLang, Theme, translations} from '@colourful/general';
import {Navigator} from '@colourful/navigation';
import {imageState, themeState} from '@colourful/state';
import {hideAsync} from 'expo-splash-screen';
import i18next from 'i18next';
import {Observer} from 'mobx-react-lite';

type State = {
	layout: boolean;
	loaded: boolean
}

export class Init extends React.Component<unknown, State> {
	state: Readonly<State> = {
		layout: false,
		loaded: false
	};

	componentDidMount(): void {
		Promise.allSettled([
			loadSavedLang(),
			Theme.loadFonts(),
		]).then(([lang]) => {
			if (lang.status === 'fulfilled') {
				i18next.use(initReactI18next).init({
					compatibilityJSON: 'v3',
					resources: translations,
					fallbackLng: 'en',
					interpolation: {
						escapeValue: false,
					},
					supportedLngs: languages,
					lng: lang.value
				});
			}
		}).then(() => this.setState({loaded: true}));
	}

	shouldComponentUpdate(_: never, nextState: Readonly<State>): boolean {
		if (nextState.layout && nextState.loaded) {
			return true;
		}

		return false;
	}

	componentDidUpdate(): void {
		const {layout, loaded} = this.state;

		if (layout && loaded) {
			hideAsync();
		}
	}

	private readonly _onLayout = () => {
		this.setState({layout: true});
	};

	private readonly _onError = () => {
		imageState.changeBackgroundImage();
	};

	private readonly _renderContent = () => {
		const {layout, loaded} = this.state;

		return (
			<AnimatedImageBackground
				entering={FadeIn}
				exiting={FadeOut}
				source={{uri: imageState.backgroundImage}}
				style={{
					flex: 1,
					backgroundColor: themeState.colors.background
				}}
				onError={this._onError}
				onLayout={this._onLayout}
			>
				{layout && loaded ? (
					<Navigator />
				) : null}
			</AnimatedImageBackground>
		);
	};

	render(): React.ReactNode {

		return (
			<Observer>
				{this._renderContent}
			</Observer>
		);
	}
}
