import {Appearance} from 'react-native';

import {ChangeColor, ThemeColors, ThemeType} from '../../domain';

import {loadTheme, saveTheme} from './actions';

import {action, computed, makeObservable, observable} from 'mobx';

let loaded = false;

type State = {
  theme: ThemeType;
  colors: Record<ThemeType, ThemeColors>
}

const initialState: State = {
	theme: Appearance.getColorScheme() ?? 'light',
	colors: {
		dark: {
			background: '#3F51B5',
			backgroundHeader: '#3F68D1',
			backgroundButton: '#3F51B550',
			textHeader: '#333333',
			textTitle: '#FFFFFF',
			textDescription: '#FAFAFA',
			themeSwitch: '#FAD02C',
			languageSwitch: null,
			border: '#BFA900',
		},
		light: {
			background: '#FAFAFA',
			backgroundHeader: '#A6A4A4',
			backgroundButton: '#F5F5F5',
			textHeader: '#000000',
			textTitle: '#808080',
			textDescription: '#00000080',
			themeSwitch: '#333652',
			languageSwitch: null,
			border: '#000000',
		}
	},
};

class ThemeState {
	private _colors: Record<ThemeType, ThemeColors> = initialState.colors;
	theme: ThemeType = initialState.theme;

	public get colors(): ThemeColors {
		return this._colors[this.theme];
	}

	constructor() {
		makeObservable<ThemeState, '_colors'>(this, {
			_colors: observable,
			changeColor: action,
			colors: computed,
			theme: observable,
			toggleTheme: action
		});

		loadTheme().then((theme) => {
			if (theme !== undefined && theme !== this.theme) {
				this.toggleTheme();
				loaded = true;
			}
		});
	}
	
	async toggleTheme() {
		console.log('first', this.theme);
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
		console.log('w', this.theme);
		if (loaded) {
			await saveTheme(this.theme);
		}
	}

	changeColor(options?: ChangeColor) {
		if (options === undefined) {
			this._colors = initialState.colors;
		} else {
			this._colors[this.theme][options.key] = options.color;
		}
	}
}

export const themeState = new ThemeState();
