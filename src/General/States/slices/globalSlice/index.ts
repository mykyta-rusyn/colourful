import {Appearance} from 'react-native';

import {Actions, Selectors, State} from './types';

import {ThemeColors, ThemeType} from '@colourful/general';
import {createSlice} from '@reduxjs/toolkit';

const defaultColors: Record<ThemeType, ThemeColors> = {
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

};

const initialState: State = {
	theme: Appearance.getColorScheme() ?? 'light',
	colors: defaultColors,
	fontFamily: 'Oswald',
};

const globalSlice = createSlice<State, Actions, 'globalSlice'>({
	name: 'globalSlice',
	initialState,
	reducers: {
		changeTheme(state, action) {
			state.theme = action.payload;
		},
		toggleTheme(state) {
			state.theme = state.theme === 'dark' ? 'light' : 'dark';
		},
		changeColor(state, action) {
			if (action.payload === undefined) {
				state.colors = defaultColors;
			} else {
				state.colors[state.theme][action.payload.key] = action.payload.color;
			}
		},
		toggleFontFamily(state) {
			state.fontFamily = state.fontFamily === 'Oswald' ? 'Roboto' : 'Oswald';
		},
		changeImages(state, action) {
			if (action.payload.flow === 'localize') {
				state.localizationImage = action.payload.localizationImage;
			} else {
				state.themeImage = action.payload.themeImage;
			}
		},
		changeBackgroundImage(state, action) {
			state.backgroundImage = action.payload;
		},
		clearImages(state) {
			state.localizationImage = undefined;
			state.themeImage = undefined;
		},
	},
});

export const globalReducer = globalSlice.reducer;

type Slice = {
	actions: typeof globalSlice.actions;
	selectors: Selectors
}

export const globalState: Slice = {
	actions: globalSlice.actions,
	selectors: {
		theme(state) {
			return state.globalReducer.theme;
		},
		colors(state) {
			return state.globalReducer.colors[state.globalReducer.theme];
		},
		localizationImage(state) {
			return state.globalReducer.localizationImage;
		},
		themeImage(state) {
			return state.globalReducer.themeImage;
		},
		fontFamily(state) {
			return state.globalReducer.fontFamily;
		},
		backgroundImage(state) {
			return state.globalReducer.backgroundImage;
		},
	}
};
