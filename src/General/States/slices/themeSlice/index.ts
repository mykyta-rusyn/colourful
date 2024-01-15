import {Appearance} from 'react-native';

import {Actions, Selectors, State} from './types';

import {createSlice} from '@reduxjs/toolkit';

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

const themeSlice = createSlice<State, Actions, 'themeSlice'>({
	name: 'themeSlice',
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
				state.colors = initialState.colors;
			} else {
				state.colors[state.theme][action.payload.key] = action.payload.color;
			}
		},
	},
});

export const themeReducer = themeSlice.reducer;

type Slice = {
	actions: typeof themeSlice.actions;
	selectors: Selectors
}

export const themeState: Slice = {
	actions: themeSlice.actions,
	selectors: {
		theme(state) {
			return state.themeReducer.theme;
		},
		colors(state) {
			return state.themeReducer.colors[state.themeReducer.theme];
		},
	}
};
